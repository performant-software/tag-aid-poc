import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Grid } from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import SearchInput from "./SearchInupt";
import { withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    search: {
        float: "right",
        display: "inline",
        height: "40px",
        width: "300px",
        border: "2px solid red",
        marginRight: "16px",
    },
}));

const Navigation = (props) => {
    const { onSearch } = props;
    useStyles();
    const [tabIndex, setTabIndex] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        let pageName = window.location.hash.split("/")[1];
        if (!pageName || pageName.includes(process.env.REACT_APP_HOMEPATH)) {
            setTabIndex(`#/Home`);
        } else {
            setTabIndex(`#/${pageName}`);
        }
    }, []);

    const StyledTabs = withStyles({
        indicator: {
            display: "flex",
            justifyContent: "flex-end !important",
            backgroundColor: "transparent",
            "& > div": {
                maxWidth: 110,
                width: "100%",
                backgroundColor: "#635ee7",
            },
        },
    })((props) => (
        <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />
    ));

    const StyledTab = withStyles((theme) => ({
        root: {
            textTransform: "none",
            padding: "0",
            margin: "0",
            minWidth: "110px",
            fontWeight: theme.typography.fontWeightRegular,
            fontSize: theme.typography.pxToRem(18),
            marginRight: theme.spacing(1),
            "&:focus": {
                opacity: 1,
            },
        },
    }))((props) => <Tab disableRipple {...props} />);

    return (
        <Grid
            container
            spacing={0}
            style={{ maxHeight: "112px", width: "100%" }}
            justifyContent="flex-end"
        >
            <Hidden mdUp>
                <Grid item>
                    <Toolbar
                        variant="dense"
                        style={{ backgroundColor: "#f8f9fa", zIndex: "9999" }}
                    >
                        <IconButton
                            edge="start"
                            onClick={() => {
                                setIsExpanded(true);
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Drawer
                            anchor="top"
                            open={isExpanded}
                            onClose={() => {
                                setIsExpanded(false);
                            }}
                        >
                            <List>
                                {[
                                    "Home",
                                    "About",
                                    "Methods",
                                    "Manuscripts",
                                    "Edition",
                                    "Visualizations",
                                ].map((text, index) => (
                                    <Fragment key={text}>
                                        <a
                                            style={{ textDecoration: "none" }}
                                            href={`#/${text}`}
                                        >
                                            <ListItem button>
                                                <ListItemText primary={text} />
                                            </ListItem>
                                            <Divider />
                                        </a>
                                    </Fragment>
                                ))}
                            </List>
                        </Drawer>
                    </Toolbar>
                </Grid>
            </Hidden>

            <Hidden smDown>
                <AppBar
                    style={{ backgroundColor: "#f8f9fa" }}
                    position="static"
                    justify="flex-end"
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            flexWrap: "wrap",
                        }}
                    >
                        <StyledTabs
                            variant="scrollable"
                            value={tabIndex}
                            style={{ color: "black" }}
                            onChange={handleTabChange}
                        >
                            <StyledTab
                                label="Home"
                                href="#/Home"
                                value="#/Home"
                            />
                            <StyledTab
                                label="About"
                                href="#/About"
                                value="#/About"
                            />
                            <StyledTab
                                label="Methods"
                                href="#/Methods"
                                value="#/Methods"
                            />
                            <StyledTab
                                label="Manuscripts"
                                href="#/Manuscripts"
                                value="#/Manuscripts"
                            />
                            <StyledTab
                                label="Edition"
                                href="#/Edition"
                                value="#/Edition"
                            />
                            <StyledTab
                                label="Visualizations"
                                href="#/Visualizations"
                                value="#/Visualizations"
                            />
                        </StyledTabs>

                        <div style={{ margin: "8px 2px" }}>
                            <SearchInput
                                onPressEnter={handlePressEnter}
                                onChange={handleChange}
                                searchQuery={searchQuery}
                            />
                        </div>
                    </div>
                </AppBar>
            </Hidden>
        </Grid>
    );

    function handleChange(e) {
        setSearchQuery(e.target.value);
    }

    function handlePressEnter() {
        onSearch(searchQuery);
        setSearchQuery("");
        props.history.push("/Search");
    }

    function handleTabChange(e, value) {
        setTabIndex(value);
    }
};

Navigation.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
    onSearch: PropTypes.func,
};

export default withRouter(Navigation);
