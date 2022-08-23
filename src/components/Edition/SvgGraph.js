import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import SVG from "react-inlinesvg";
import panzoom from "panzoom";

const SvgGraph = ({
    sectionId,
    highlightedNode,
    selectedSentence,
    selectedRank,
    onSelectNode,
    nodeHash,
    nodeList,
    persons,
    places,
    dates,
    selectedTimestamp,
}) => {
    const svgRef = useRef(null);

    useEffect(() => {
        panzoom(svgRef.current);
    }, []);

    useEffect(() => {
        highlightAndSelect();
    }, [persons, places, dates]);

    useEffect(() => {
        if (selectedRank) {
            let nodesAtRank = nodeList.filter(
                (n) => n.rank === parseInt(selectedRank)
            );
            for (let i = 0; i < nodesAtRank.length; i++) {
                const zoomNode = getGraphDOMNode(nodesAtRank[i].id);
                if (zoomNode) {
                    scrollToNode(zoomNode);
                    break;
                }
            }
        }
        highlightAndSelect();
    }, [selectedRank, nodeList]);

    useEffect(() => {
        if (selectedSentence) {
            const domNode = getGraphDOMNode(selectedSentence.startId);
            scrollToNode(domNode);
        }
        highlightAndSelect();
    }, [selectedSentence]);

    useEffect(() => {
        if (!highlightedNode) return;
        const domNode = getGraphDOMNode(highlightedNode.nodeId);
        scrollToNode(domNode);
    }, [highlightedNode]);

    return (
        <div style={{ position: "relative", padding: "16px" }}>
            <div ref={svgRef}>
                <SVG
                    src={`data/${selectedTimestamp}/${sectionId}/graph.svg`}
                    style={{ cursor: "grab" }}
                    onClick={handleClick}
                    onLoad={defaultStart}
                />
            </div>
        </div>
    );

    function handleClick(ev) {
        const nodeGroup = ev.target;
        if (nodeGroup != null) {
            const id = nodeGroup.parentNode.id;
            let trimmedId = id.replace("n", "");
            let lookUp = nodeHash[trimmedId];
            if (lookUp) onSelectNode({ nodeId: trimmedId, rank: lookUp.rank });
        }
    }

    function highlightAndSelect() {
        let allGraphNodes = svgRef.current.querySelectorAll("g.node");
        allGraphNodes.forEach((n) => {
            if (n.id === "__START__" || n.id === "__END__") return;
            let nodeId = n.id.replace("n", "");
            let rank;
            if (nodeHash[parseInt(nodeId)]) rank = nodeHash[nodeId].rank;
            // else
            // console.log( 'unable to look up rank for', nodeId )
            // to do is look up the node's rank, we need to pass the readings in (a readings hash wouldnt be bad- or encode in the svg gen script)
            let classNames = "node";
            let inHighlightedSentence = false;
            let isSelectedNode = false;
            let isPerson = false;
            let isPlace = false;
            let isDate = false;
            let isRank = false;

            if (selectedSentence && nodeHash && rank) {
                inHighlightedSentence =
                    rank.toString() >= selectedSentence.startRank.toString() &&
                    rank <= selectedSentence.endRank.toString();
            }

            if (persons)
                isPerson = persons.find((p) => {
                    return p.begin.toString() === nodeId.toString();
                });
            if (places)
                isPlace = places.find((p) => {
                    return p.begin.toString() === nodeId.toString();
                });
            if (dates)
                isDate = dates.find((d) => {
                    return d.begin.toString() === nodeId.toString();
                });
            if (highlightedNode)
                isSelectedNode = nodeId === highlightedNode.nodeId;
            if (selectedRank && rank)
                isRank = rank.toString() === selectedRank.toString();

            if (isPerson) {
                classNames += " person";
            } else if (isPlace) {
                classNames += " place";
            } else if (isDate) {
                classNames += " date";
            } else if (inHighlightedSentence) {
                classNames += " highlight";
            }

            if (isRank) {
                classNames += " disonance";
            }

            if (isSelectedNode) classNames += " active";

            n.setAttribute("class", classNames);
        });
    }

    function scrollToNode(domNode, verticalOnly) {
        // scroll to the current node
        if (domNode && svgRef.current) {
            // workaround for scrollIntoView (inline: center, block: center) on Firefox
            const svgContainer = svgRef.current.parentNode.parentNode;
            const svg = svgContainer.getBoundingClientRect();
            const node = domNode.getBoundingClientRect();

            const nodeY = node.top + node.height / 2.0;
            const svgY = svg.top + svg.height / 2.0;
            const newScrollY = nodeY - svgY + svgContainer.scrollTop;

            const nodeX = node.left + node.width / 2.0;
            const svgX = svg.left + svg.width / 2.0;
            const newScrollX = nodeX - svgX + svgContainer.scrollLeft;

            svgContainer.scrollTo({
                top: newScrollY,
                left: verticalOnly ? svgContainer.scrollLeft : newScrollX,
                behavior: "smooth",
            });
        }
    }

    function getGraphDOMNode(nodeId) {
        const graphRef = svgRef.current;
        let selector = `g#n${nodeId}`;
        let found = graphRef.querySelector(selector);
        return found;
    }

    function defaultStart(src, cache) {
        let startNode = getStartNode();
        if (startNode) {
            startNode.setAttribute("class", "node highlight start");
            scrollToNode(startNode, true);
        } else console.error("error finding start");
    }

    function getStartNode() {
        const graphRef = svgRef.current;
        let selector = `g#__START__`;
        let found = graphRef.querySelector(selector);
        return found;
    }
};

SvgGraph.propTypes = {
    dates: PropTypes.array,
    highlightedNode: PropTypes.shape({
        nodeId: PropTypes.string,
        rank: PropTypes.number,
    }),
    nodeHash: PropTypes.object,
    nodeList: PropTypes.array,
    onSelectNode: PropTypes.func,
    persons: PropTypes.array,
    places: PropTypes.array,
    sectionId: PropTypes.string,
    selectedRank: PropTypes.number,
    selectedSentence: PropTypes.shape({
        startId: PropTypes.string,
        startRank: PropTypes.number,
        endRank: PropTypes.number,
    }),
    selectedTimestamp: PropTypes.string,
};

export default SvgGraph;
