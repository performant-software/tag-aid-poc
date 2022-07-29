import React, { useEffect, useRef } from "react";
import SVG from "react-inlinesvg";
import panzoom from "panzoom";

const SvgGraph = (props) => {
    const {
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
    } = props;

    const svgRef = useRef(null);

    useEffect(() => {
        panzoom(svgRef.current);
    }, []);

    useEffect(() => {
        highlightAndSelect();
    }, [persons, places, dates]);

    useEffect(() => {
        if (props.selectedRank) {
            let nodesAtRank = nodeList.filter(
                (n) => n.rank === parseInt(props.selectedRank)
            );
            for (let i = 0; i < nodesAtRank.length; i++) {
                const zoomNode = getGraphDOMNode(nodesAtRank[i].id);
                if (zoomNode) {
                    zoomToNode(zoomNode);
                    break;
                }
            }
        }
        highlightAndSelect();
    }, [props.selectedRank, nodeList]);

    useEffect(() => {
        if (props.selectedSentence) {
            const domNode = getGraphDOMNode(props.selectedSentence.startId);
            zoomToNode(domNode);
        }
        highlightAndSelect();
    }, [props.selectedSentence]);

    useEffect(() => {
        if (!props.highlightedNode) return;
        const domNode = getGraphDOMNode(props.highlightedNode.nodeId);
        zoomToNode(domNode);
    }, [props.highlightedNode]);

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

    function zoomToNode(domNode) {
        if (domNode)
            domNode.scrollIntoView({
                behavior: "smooth",
                inline: "center",
                block: "center",
            });
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
            startNode.scrollIntoView({
                behavior: "smooth",
                inline: "center",
                block: "center",
            });
        } else console.log("cant find start");
    }

    function getStartNode() {
        const graphRef = svgRef.current;
        let selector = `g#__START__`;
        let found = graphRef.querySelector(selector);
        return found;
    }
};
export default SvgGraph;
