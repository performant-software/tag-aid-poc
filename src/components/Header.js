import React from "react";
import { Grid } from "@material-ui/core";
import Navigation from "./Navigation";

const Header = (props) => {
    const { onSearch } = props;

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
export default Header;
