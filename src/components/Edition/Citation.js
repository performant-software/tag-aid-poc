import React from "react";
import PropTypes from "prop-types";

const Citation = ({ selectedTimestamp }) => {
    const citationDate = selectedTimestamp
        ? new Date(selectedTimestamp.split("_").slice(1)).toLocaleString(
              "default",
              { year: "numeric", month: "short", day: "numeric" }
          )
        : "";

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                padding: "10px 30px",
            }}
        >
            <p>
                Suggested citation:
                <br />
                Andrews, Tara, Tatevik Atayan, and Anahit Safaryan. “The
                Chronicle of Matthew of Edessa Online”, last modified{" "}
                {citationDate}. {window.location.href}
            </p>
        </div>
    );
};

Citation.propTypes = {
    selectedTimestamp: PropTypes.string,
};

export default Citation;
