import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import EditionHeader from "./EditionHeader";
import Paper from "@material-ui/core/Paper";
import lunr from "lunr";
import Typography from "@material-ui/core/Typography";
import Parser, { domToReact } from "html-react-parser";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const SearchResults = (props) => {
    const {
        searchTerm,
        onSearch,
        translationDictionary,
        translationIndex,
        armenianDictionary,
        armenianIndex,
        sections,
    } = props;
    const [groupedResults, setGroupedResults] = useState([]);
    const [dataDictionary, setDataDictionary] = useState([]);
    const [isArmenian, setIsArmenian] = useState();
    //  const [witnessName, setWitnessName] = useState();

    const parserOptions = {
        replace: function (domNode) {
            if (domNode.children) {
                if (
                    domNode.children[0].data
                        .toLowerCase()
                        .indexOf(searchTerm.toLowerCase()) > -1
                )
                    return (
                        <span style={{ backgroundColor: "#F2F19C" }}>
                            {domToReact(domNode.children, parserOptions)}
                        </span>
                    );
                else
                    return (
                        <span>
                            {domToReact(domNode.children, parserOptions)}
                        </span>
                    );
            }
        },
    };

    useEffect(() => {
        if (!searchTerm) return;

        const characterCode = searchTerm.codePointAt(0);
        let armenianCharacter =
            characterCode >= 1280 && characterCode <= 1535 ? true : false;
        let idx;

        if (!armenianCharacter) {
            setIsArmenian(false);
            //   setWitnessName("Translation");
            idx = lunr.Index.load(translationIndex);
            setDataDictionary(translationDictionary);
        } else {
            setIsArmenian(true);
            //  setWitnessName("Lemma Text");// for now its trans or lemma
            idx = lunr.Index.load(armenianIndex);
            setDataDictionary(armenianDictionary);
        }

        let hopingFor = idx.query((q) => {
            // look for an exact match and apply a large positive boost
            q.term(searchTerm.toLowerCase(), { usePipeline: true, boost: 100 });

            // look for terms that match the beginning of this queryTerm and apply a medium boost
            q.term(searchTerm.toLowerCase(), {
                wildcard:
                    lunr.Query.wildcard.LEADING | lunr.Query.wildcard.TRAILING,
                usePipeline: false,
                boost: 10,
            });
        });
        groupSearchResults(hopingFor);
    }, [searchTerm]);

    return (
        <Grid container spacing={0}>
            <Grid
                id="edition-header"
                item
                xs={12}
                style={{ backgrounColor: "red", height: "114px" }}
            >
                <EditionHeader onSearch={onSearch} />
            </Grid>

            <Grid id="mainContent" item xs={12}>
                {searchTerm && (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "40px",
                        }}
                    >
                        <Paper
                            style={{
                                margin: "12px",
                                width: "80%",
                                padding: "12px",
                            }}
                        >
                            <div style={{ display: "flex" }}>
                                <Typography
                                    variant="h5"
                                    style={{ marginBottom: "31px" }}
                                >
                                    {`Search Results for`}
                                </Typography>
                                <Typography
                                    variant="h5"
                                    style={{
                                        fontStyle: "italic",
                                        marginLeft: "6px",
                                    }}
                                >
                                    {searchTerm}
                                </Typography>
                            </div>

                            {groupedResults.length > 0 ? (
                                isArmenian ? (
                                    groupedResults.map((r) => {
                                        const label =
                                            r.year > 1
                                                ? `Year ${r.year}`
                                                : r.header &&
                                                  r.header.englishTitle
                                                ? r.header.englishTitle
                                                : "Untitled";
                                        return (
                                            <div
                                                key={r.year}
                                                style={{ marginBottom: "16px" }}
                                            >
                                                <ExpansionPanel>
                                                    <ExpansionPanelSummary
                                                        expandIcon={
                                                            <ExpandMoreIcon />
                                                        }
                                                    >
                                                        <Typography variant="h5">
                                                            {" "}
                                                            {label} -{" "}
                                                            {r.witnesses.length}{" "}
                                                            {r.witnesses
                                                                .length === 1
                                                                ? `Witness`
                                                                : `Witnesses`}
                                                        </Typography>
                                                    </ExpansionPanelSummary>
                                                    <ExpansionPanelDetails
                                                        style={{
                                                            display: "flex",
                                                            flexDirection:
                                                                "column",
                                                        }}
                                                    >
                                                        {r.witnesses.map(
                                                            (w) => {
                                                                return (
                                                                    <Link
                                                                        key={
                                                                            w.sectionId
                                                                        }
                                                                        style={{
                                                                            display:
                                                                                "block",
                                                                        }}
                                                                        to={`/Edition/${
                                                                            w.sectionId
                                                                        }/${
                                                                            w.witness
                                                                                ? w.witness
                                                                                : ""
                                                                        }`}
                                                                        color="secondary"
                                                                    >
                                                                        <Typography
                                                                            variant="h6"
                                                                            style={{
                                                                                marginLeft:
                                                                                    "8px",
                                                                            }}
                                                                        >
                                                                            {`Witness Sigil: ${w.witness}`}
                                                                        </Typography>
                                                                    </Link>
                                                                );
                                                            }
                                                        )}
                                                    </ExpansionPanelDetails>
                                                </ExpansionPanel>
                                            </div>
                                        );
                                    })
                                ) : (
                                    groupedResults.map((r) => {
                                        let value;
                                        let section = r.witnesses[0].sectionId;
                                        let dataResult = dataDictionary.find(
                                            (d) => {
                                                return d.sectionId === section;
                                            }
                                        );
                                        if (!dataResult) {
                                            return <></>;
                                        }
                                        value = dataResult.text;
                                        let foundSection = sections.find(
                                            (s) => {
                                                return s.sectionId === section;
                                            }
                                        );
                                        let label = foundSection
                                            ? foundSection.englishTitle
                                            : "Untitled";
                                        return (
                                            <div
                                                key={r.ref}
                                                style={{ marginBottom: "16px" }}
                                            >
                                                <Button
                                                    size="large"
                                                    component={Link}
                                                    to={`/Edition/${section}`}
                                                    color="secondary"
                                                >
                                                    <Typography variant="h6">
                                                        {label}
                                                    </Typography>
                                                </Button>

                                                <Typography variant="body1">
                                                    {Parser(
                                                        value,
                                                        parserOptions
                                                    )}
                                                </Typography>
                                            </div>
                                        );
                                    })
                                )
                            ) : searchTerm ? (
                                <Typography>
                                    {`${searchTerm} not found`}
                                </Typography>
                            ) : (
                                <span />
                            )}
                        </Paper>
                    </div>
                )}
            </Grid>
        </Grid>
    );

    function groupSearchResults(lunrSearch) {
        let groupedYears = [];
        lunrSearch.forEach((result) => {
            let sectionId = result.ref.split("-")[0];
            let witness = result.ref.split("-")[1];
            let header = sections.find((s) => {
                return s.sectionId === sectionId;
            });

            let year = header
                ? parseInt(header.englishTitle.match(/(\d+)/)[0])
                : 1;
            let yearGroup = year
                ? groupedYears.find((gr) => {
                      return gr.year === year;
                  })
                : null;

            if (yearGroup) {
                yearGroup.witnesses.push({
                    sectionId: sectionId,
                    witness: witness,
                    year: year,
                    text: result.text,
                    header: header,
                }); // denormalized redundant year I know
                yearGroup.witnesses.sort((a, b) => {
                    if (a.witness.toUpperCase() > b.witness.toUpperCase())
                        return 1;
                    if (a.witness.toUpperCase() < b.witness.toUpperCase())
                        return -1;
                    else return 0;
                });
            } else {
                let witnesses = [];
                witnesses.push({
                    sectionId: sectionId,
                    witness: witness,
                    year: year,
                    text: result.text,
                    header: header,
                });
                groupedYears.push({ year: year, witnesses: witnesses });
            }
        });

        groupedYears.sort((a, b) => {
            return b.witnesses.length - a.witnesses.length;
        });

        setGroupedResults(groupedYears);
    }
};

export default SearchResults;
