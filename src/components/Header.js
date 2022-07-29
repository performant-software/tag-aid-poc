import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import Navigation from "./Navigation";

const Header = ({ onSearch }) => {
    return (
        <Grid container spacing={0}>
            <Grid item xs={12}>
                <div
                    id="headerPanel"
                    role="banner"
                    style={{ textAlign: "center", marginBottom: "4px" }}
                >
                    <img
                        id="banner-logo"
                        src="images/edessa_logo.png"
                        alt="The Chronicle of Matthew of Edessa"
                    />
                </div>
            </Grid>
            <Grid item xs={12}>
                <Navigation onSearch={onSearch} />
            </Grid>
        </Grid>
    );
};

Header.propTypes = {
    onSearch: PropTypes.func,
};

export default Header;
