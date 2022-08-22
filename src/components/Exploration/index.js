import React from "react";
import PropTypes from "prop-types";
import Header from "../Header";
import {
    Grid,
    Card,
    CardMedia,
    CardActionArea,
    CardContent,
    Typography,
    Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: 40,
        paddingBottom: 40,
    },
    title: {
        color: "darkred",
        textDecoration: "none",
        fontSize: "2rem",
        marginBottom: 0,
        fontStyle: "italic",
    },
    link: {
        textDecoration: "none",
    },
}));

const Exploration = ({ onSearch }) => {
    const classes = useStyles();
    return (
        <>
            <Header onSearch={onSearch} />
            <Container className={classes.root}>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                        <Card>
                            <CardActionArea
                                href="#/Exploration/Map"
                                className={classes.link}
                            >
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="h2"
                                        align={"center"}
                                        className={classes.title}
                                    >
                                        Map
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
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Card>
                            <CardActionArea
                                href="#/Exploration/Timeline"
                                className={classes.link}
                            >
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="h2"
                                        align={"center"}
                                        className={classes.title}
                                    >
                                        Timeline
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
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Card>
                            <CardActionArea
                                href="#/Exploration/Persons"
                                className={classes.link}
                            >
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="h2"
                                        align={"center"}
                                        className={classes.title}
                                    >
                                        Persons
                                    </Typography>
                                </CardContent>
                                <CardMedia
                                    component="img"
                                    alt="Persons"
                                    height="200"
                                    image="images/anonymous.jpg"
                                    title="Persons"
                                />
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

Exploration.propTypes = {
    onSearch: PropTypes.func,
};

export default Exploration;
