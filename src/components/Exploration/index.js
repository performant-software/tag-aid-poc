import React from "react";
import PropTypes from "prop-types";
import Header from "../Header";
import {
    Container,
    Card,
    CardMedia,
    CardActionArea,
    CardContent,
    Typography,
    useMediaQuery,
} from "@material-ui/core";

const Exploration = ({ onSearch }) => {
    const smallScreen = useMediaQuery("(min-width:600px)");

    const containerStyle = {
        display: "flex",
        flexDirection: smallScreen ? "row" : "column",
        justifyContent: "space-between",
        paddingTop: 40,
    };

    const cardStyle = {
        width: smallScreen ? "48%" : "98%",
        marginBottom: smallScreen ? 0 : 20,
    };

    const titleStyle = {
        color: "darkred",
        textDecoration: "none",
        fontSize: "2rem",
        marginBottom: 0,
    };

    const linkStyle = {
        textDecoration: "none",
    };

    return (
        <>
            <Header onSearch={onSearch} />
            <Container fixed style={containerStyle}>
                <Card style={cardStyle}>
                    <CardActionArea href="#/Exploration/Map" style={linkStyle}>
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="h2"
                                align={"center"}
                                style={titleStyle}
                            >
                                <i> Map </i>
                            </Typography>
                        </CardContent>
                        <CardMedia
                            component="img"
                            alt="Map"
                            height="200"
                            image="images/Map.png"
                            title="Map"
                        />
                    </CardActionArea>
                </Card>

                <Card style={cardStyle}>
                    <CardActionArea
                        href="#/Exploration/Timeline"
                        style={linkStyle}
                    >
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="h2"
                                align={"center"}
                                style={titleStyle}
                            >
                                <i> Timeline </i>
                            </Typography>
                        </CardContent>
                        <CardMedia
                            component="img"
                            alt="Timeline"
                            height="200"
                            image="images/Timeline.png"
                            title="Timeline"
                        />
                    </CardActionArea>
                </Card>
            </Container>
        </>
    );
};

Exploration.propTypes = {
    onSearch: PropTypes.func,
};

export default Exploration;
