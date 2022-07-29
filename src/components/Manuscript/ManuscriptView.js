import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import Header from "../Header";
import { useParams } from "react-router-dom";
import * as DataApi from "../../utils/Api";
import { withRouter } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Hidden from "@material-ui/core/Hidden";

const ManuscriptView = (props) => {
    let { manuscriptId } = useParams();
    if (!manuscriptId) manuscriptId = "M2855";

    const [imageUrl, setImageUrl] = useState();
    const [imageTop, setImageTop] = useState();

    useEffect(() => {
        if (!manuscriptId) return;

        DataApi.getManuscript(manuscriptId, (data) => {
            try {
                document.getElementById("textContainer").innerHTML =
                    data.trim();
                let imageEls = document.getElementsByTagName("img");

                for (let x = 0; x < imageEls.length; x++) {
                    imageEls[x].onclick = (e) => {
                        setImageUrl(e.target.src);
                        let y = e.target.offsetTop - 30; // 30 is height of the buttons
                        let strTop = `${y}px`;
                        setImageTop(strTop);
                    };
                }
            } catch (error) {
                console.log(error);
            }
        });
    }, [manuscriptId]);

    let imageStyle = {
        position: "absolute",
        top: imageTop,
        maxWidth: "50%",
        width: "50%",
    };

    return (
        <Grid container spacing={0} style={{ boxSizing: "border-box" }}>
            <Grid item xs={12}>
                <Header />
            </Grid>

            <Grid item xs={12} md={6}>
                <Typography
                    id="textContainer"
                    variant="h6"
                    style={{
                        margin: 12,
                        marginLeft: 20,
                        overflowWrap: "break-word",
                    }}
                ></Typography>
            </Grid>
            <Hidden xsDown>
                <Grid item md={6}>
                    {imageUrl && (
                        <div id="enlargedView" style={imageStyle}>
                            <TransformWrapper
                                defaultScale={1}
                                defaultPositionX={200}
                                defaultPositionY={100}
                            >
                                {({ zoomIn, zoomOut, ...rest }) => (
                                    <div
                                        style={{
                                            backgroundColor:
                                                "rgb(255, 250, 245)",
                                        }}
                                    >
                                        <div className="tools">
                                            <button onClick={zoomIn}>+</button>
                                            <button onClick={zoomOut}>-</button>
                                            <button onClick={hideImage}>
                                                x
                                            </button>
                                        </div>
                                        <TransformComponent>
                                            <img
                                                src={imageUrl}
                                                alt={imageUrl}
                                                width="98%"
                                            />
                                        </TransformComponent>
                                    </div>
                                )}
                            </TransformWrapper>
                        </div>
                    )}
                </Grid>
            </Hidden>
        </Grid>
    );

    function hideImage() {
        setImageUrl("");
    }
};
export default withRouter(ManuscriptView);
