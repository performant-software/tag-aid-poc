import React, { useState } from "react";
import PropTypes from "prop-types";
import EditionHeader from "../Edition/EditionHeader";
import Chart from "react-google-charts";
import { Redirect, withRouter } from "react-router-dom";

const Timeline = ({ onSearch, timelineData }) => {
    const [redirectPath, setRedirectPath] = useState();

    // only want to show events that have an earliest and/or latest date -- can't show
    // events on a timeline without at least one date
    const filteredDataset = timelineData.filter(
        (event) => event.earliestDate || event.latestDate
    );

    // if only one date (i.e. earliest OR latest), earliest and latest dates will be the same
    filteredDataset.forEach((event) => {
        if (event.earliestDate === null) {
            event.earliestDate = event.latestDate;
        } else if (event.latestDate === null) {
            event.latestDate = event.earliestDate;
        }
    });

    const sortedDataset = filteredDataset.sort((a, b) => {
        return (
            new Date(a.earliestDate).getTime() -
            new Date(b.earliestDate).getTime()
        );
    });

    const pickDate = (date1, date2, earliestOrLatest) => {
        if (earliestOrLatest === "earliest") {
            return date1 < date2 ? date1 : date2;
        } else if (earliestOrLatest === "latest") {
            return date1 < date2 ? date2 : date1;
        }
    };

    const data = [
        [
            { type: "string", id: "Section" },
            { type: "string", id: "Label" },
            { type: "date", id: "Start" },
            { type: "date", id: "End" },
        ],
        ...sortedDataset.map((event) => [
            event.section,
            event.translation || "No translation available",
            pickDate(
                new Date(event.earliestDate),
                new Date(event.latestDate),
                "earliest"
            ),
            pickDate(
                new Date(event.earliestDate),
                new Date(event.latestDate),
                "latest"
            ),
        ]),
    ];

    if (redirectPath) {
        return <Redirect push to={`/Edition/${redirectPath}`} />;
    }

    return (
        <>
            <EditionHeader onSearch={onSearch} />
            <h1 style={{ margin: 40, textAlign: "center" }}>
                {" "}
                <i>Timeline</i>
            </h1>
            <Chart
                width={"95vw"}
                height={"65vh"}
                style={{ marginLeft: 10 }}
                chartType="Timeline"
                loader={<div>Loading Chart</div>}
                data={data}
                options={{
                    timeline: {
                        showRowLabels: false,
                        groupByRowLabel: false,
                    },
                }}
                chartEvents={[
                    {
                        eventName: "select",
                        callback: ({ chartWrapper }) => {
                            const chart = chartWrapper.getChart();
                            const selection = chart.getSelection();
                            if (selection && selection.length === 1) {
                                const dataTable = chartWrapper.getDataTable();
                                const [selectedItem] = selection;
                                const { row } = selectedItem;
                                const sectionID = dataTable.getValue(row, 0);
                                setRedirectPath(sectionID);
                            }
                        },
                    },
                    {
                        eventName: "ready",
                        callback: () => {
                            // for vertical scroll
                            document
                                .querySelectorAll("#reactgooglegraph-1 svg")
                                .forEach((el) => (el.style.height = "auto"));
                        },
                    },
                ]}
                rootProps={{ "data-testid": "1" }}
            />
        </>
    );
};

Timeline.propTypes = {
    onSearch: PropTypes.func,
    timelineData: PropTypes.array,
};

export default withRouter(Timeline);
