import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import PlayCircleOutlineOutlinedIcon from "@material-ui/icons/PlayCircleOutlineOutlined";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const buttonStyles = {
    cleanButton: {
        outline: "none",
    },
};

const PreviousNext = ({ onPrevious, onNext, sections, sectionId }) => {
    const [title, setTitle] = useState();

    useEffect(() => {
        if (!sections || !sectionId) return;
        let year = "";
        let section = sections.find((s) => {
            return s.sectionId.toString() === sectionId.toString();
        });
        if (!section) return;
        year = section.englishTitle.split("(")[0]
            ? section.englishTitle.split("(")[0]
            : section.englishTitle;

        setTitle(year);
    }, [sections, sectionId]);

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                padding: "8px",
            }}
        >
            <IconButton
                onClick={onPrevious}
                style={{ margin: "2px", outline: "none" }}
            >
                <PlayCircleOutlineOutlinedIcon
                    style={{
                        width: "40px",
                        height: "40px",
                        transform: "rotate(180deg)",
                    }}
                />
            </IconButton>
            <Typography
                variant="h5"
                style={{
                    marginTop: "20px",
                    marginRight: "10px",
                    marginLeft: "10px",
                }}
            >
                {title}
            </Typography>
            <IconButton
                onClick={onNext}
                style={{ margin: "2px", outline: "none" }}
            >
                <PlayCircleOutlineOutlinedIcon
                    style={{ width: "40px", height: "40px" }}
                />
            </IconButton>
        </div>
    );
};

PreviousNext.propTypes = {
    onNext: PropTypes.func,
    onPrevious: PropTypes.func,
    sectionId: PropTypes.string,
    sections: PropTypes.array,
};

export default withStyles(buttonStyles)(PreviousNext);
