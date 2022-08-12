import React from "react";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";

const SectionList = ({ list, sectionId, height, witnessId }) => {
    const titleDisplay = (title) => {
        const wordArray = title.split(" ");
        const firstThreeWords = wordArray.slice(0, 3).join(" ");
        const remainingWords = wordArray
            .slice(3, wordArray.length)
            .join(" ")
            .replace("–", " – ");
        return [firstThreeWords, remainingWords];
    };

    return (
        <Paper
            elevation={2}
            style={{ marginLeft: "16px", height, overflowY: "auto" }}
        >
            <Typography variant="h6" style={{ margin: "16px 24px 0px" }}>
                {"Index"}
            </Typography>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <List>
                    {list
                        ? list.map((s) => {
                              let selectUrl = witnessId
                                  ? `/Edition/${s.sectionId}/${witnessId}`
                                  : `/Edition/${s.sectionId}`;

                              return (
                                  <ListItem
                                      key={s.sectionId}
                                      value={s.sectionId}
                                      selected={s.sectionId === sectionId}
                                  >
                                      <div
                                          style={{
                                              display: "flex",
                                              flexDirection: "column",
                                          }}
                                      >
                                          <Link to={selectUrl}>
                                              <Typography
                                                  variant="body1"
                                                  style={{
                                                      wordWrap: "break-word",
                                                  }}
                                              >
                                                  {
                                                      titleDisplay(
                                                          s.englishTitle
                                                      )[0]
                                                  }
                                              </Typography>
                                              <Typography
                                                  variant="body1"
                                                  style={{
                                                      wordWrap: "break-word",
                                                  }}
                                              >
                                                  {
                                                      titleDisplay(
                                                          s.englishTitle
                                                      )[1]
                                                  }
                                              </Typography>
                                          </Link>
                                      </div>
                                  </ListItem>
                              );
                          })
                        : ""}
                </List>
            </div>
        </Paper>
    );
};
SectionList.propTypes = {
    height: PropTypes.string,
    list: PropTypes.array,
    sectionId: PropTypes.string,
    witnessId: PropTypes.string,
};
export default SectionList;
