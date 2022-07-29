import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import * as DataApi from "../../utils/Api";
import {
    VictoryChart,
    VictoryBar,
    VictoryContainer,
    VictoryAxis,
} from "victory";

const RankDisonance = ({
    sectionId,
    highlightedNode,
    selectedRank,
    selectedSentence,
    onSelectRank,
    viewport,
    selectedTimestamp,
}) => {
    const [chartData, setChartData] = useState();

    useEffect(() => {
        setChartData([]);
        setChartData(null);
        DataApi.getRankReport(
            sectionId,
            (report) => {
                report.sort((a, b) => {
                    if (a.rank > b.rank) return 1;
                    if (a.rank < b.rank) return -1;
                    else return 0;
                });

                const formatedForChart = generateChartData(report);
                setChartData(formatedForChart);
            },
            selectedTimestamp
        );
    }, [sectionId, selectedSentence, selectedTimestamp]);

    const xaxisStyle = {
        grid: { stroke: "transparent" },
        axis: { stroke: "grey" },
        ticks: { stroke: "transparent" },
        tickLabels: { fill: "none" },
    };

    const yaxisStyle = {
        grid: { stroke: "#E9E4E8" },
        axis: { stroke: "grey" },
        ticks: { stroke: "transparent" },
        tickLabels: { fill: "none" },
    };

    const containerHeight = viewport.height * 0.12;
    const chartHeight = containerHeight * 0.85;

    return (
        <div
            style={{
                height: containerHeight,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}
        >
            {chartData && (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: containerHeight,
                    }}
                >
                    <VictoryChart
                        title="Rank Disonance"
                        domainPadding={{ x: 6 }}
                        padding={{ top: 6, bottom: 3, left: 12, right: 12 }}
                        containerComponent={
                            <VictoryContainer responsive={false} />
                        }
                        height={chartHeight}
                        width={
                            viewport.width > 960
                                ? viewport.width * 0.8
                                : viewport.width * 0.96
                        }
                        scale={{ x: "linear", y: "linear" }}
                    >
                        <VictoryAxis crossAxis style={xaxisStyle} />
                        <VictoryAxis dependentAxis style={yaxisStyle} />
                        <VictoryBar
                            style={{
                                data: {
                                    fill: ({ datum }) => getBarColor(datum),
                                },
                                parent: { border: "1px solid #ccc" },
                                labels: { display: "none" },
                            }}
                            barRatio={0.7}
                            data={chartData}
                            labels={[]}
                            events={[
                                {
                                    target: "data",
                                    eventHandlers: {
                                        onClick: (event, props, key) => {
                                            onSelectRank(key);
                                            return [
                                                {
                                                    target: "data",
                                                    eventKey: key,
                                                    mutation: (props) => {
                                                        return {
                                                            style: {
                                                                fill: "#D4FCA4",
                                                            },
                                                        };
                                                    },
                                                },
                                                {
                                                    target: "data",
                                                    eventKey: selectedRank,
                                                    mutation: (props) => {
                                                        return {
                                                            style: {
                                                                fill: "#550C18",
                                                            },
                                                        };
                                                    },
                                                },
                                            ];
                                        },
                                        onMouseEnter: () => {
                                            return [
                                                {
                                                    mutation: (props) => {
                                                        return {
                                                            style: {
                                                                fill: "#D4FCA4",
                                                            },
                                                        };
                                                    },
                                                },
                                            ];
                                        },
                                        onMouseOut: (event, props, key) => {
                                            if (key !== selectedRank)
                                                return [
                                                    {
                                                        mutation: (props) => {
                                                            let color;
                                                            const keyInt =
                                                                parseInt(key);
                                                            const rangeStart =
                                                                selectedSentence
                                                                    ? parseInt(
                                                                          selectedSentence.startRank
                                                                      )
                                                                    : null;
                                                            const rangeEnd =
                                                                selectedSentence
                                                                    ? parseInt(
                                                                          selectedSentence.endRank
                                                                      )
                                                                    : null;

                                                            if (
                                                                highlightedNode &&
                                                                keyInt ===
                                                                    highlightedNode.rank
                                                            ) {
                                                                color =
                                                                    "#D4FCA4";
                                                            } else if (
                                                                selectedSentence &&
                                                                keyInt >=
                                                                    rangeStart &&
                                                                keyInt <=
                                                                    rangeEnd
                                                            ) {
                                                                color =
                                                                    "#F2F19C";
                                                            } else {
                                                                color =
                                                                    "#550C18";
                                                            }
                                                            return {
                                                                style: {
                                                                    fill: color,
                                                                },
                                                            };
                                                        },
                                                    },
                                                ];
                                        },
                                    }, // end event handlers
                                },
                            ]}
                        />
                    </VictoryChart>
                </div>
            )}
        </div>
    );

    function getBarColor(datum) {
        let color = "#550C18";
        if (selectedSentence) {
            if (
                datum.x >= selectedSentence.startRank &&
                datum.x <= selectedSentence.endRank
            )
                color = "#F2F19C";
        }
        if (highlightedNode) {
            if (datum.x.toString() === highlightedNode.rank.toString()) {
                color = "#D4FCA4";
                return color;
            }
        }
        if (selectedRank) {
            if (datum.x.toString() === selectedRank.toString()) {
                color = "#D4FCA4";
                return color;
            }
        }
        return color;
    }

    // to do let generator script do this
    function generateChartData(report) {
        let data = [];
        report.forEach((item) => {
            const dataPoint = {
                x: item.rank,
                y: item.instances,
                label: `${item.rank}`,
            };
            data.push(dataPoint);
        });
        return data;
    }
};
RankDisonance.propTypes = {
    highlightedNode: PropTypes.shape({
        nodeId: PropTypes.string,
        rank: PropTypes.number,
    }),
    onSelectRank: PropTypes.func,
    sectionId: PropTypes.string,
    selectedRank: PropTypes.number,
    selectedSentence: PropTypes.shape({
        startId: PropTypes.string,
        startRank: PropTypes.number,
        endRank: PropTypes.number,
    }),
    selectedTimestamp: PropTypes.string,
    viewport: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number,
    }),
};
export default RankDisonance;
