import React, { useLayoutEffect, useRef } from "react";
import PropTypes from "prop-types";
import EditionHeader from "../Edition/EditionHeader";
import { withRouter } from "react-router-dom";
import { useParams } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const processLinks = (links, personLookup, sections) => {
    return [
        ...new Map(
            links
                .map((link) => {
                    const lookup = personLookup?.find(
                        (l) =>
                            l.annotationRefId.toString() ===
                            link.target.toString()
                    );
                    if (lookup) {
                        const { sectionId } = lookup;
                        const titles = sections.find(
                            (s) =>
                                s.sectionId.toString() === sectionId.toString()
                        );
                        const englishTitle =
                            titles && titles.englishTitle
                                ? titles.englishTitle
                                : "";
                        return {
                            sectionId,
                            title: englishTitle,
                            index: titles?.index || 0,
                            type: link.type,
                        };
                    }
                })
                .sort((a, b) => a.index - b.index)
                .filter((item) => item?.title)
                .map((item) => [item.sectionId, item])
        ).values(),
    ];
};

const useStyles = makeStyles(() => ({
    root: {
        maxWidth: "72ch",
    },
    header: {
        textAlign: "center",
        margin: "30px 0px 10px 0px",
    },
    list: {
        width: "100%",
        maxWidth: "72ch",
    },
    listItem: {
        paddingTop: "20px",
    },
    cardActions: {
        display: "flex",
        justifyContent: "space-between",
    },
}));

const PersonsList = ({ onSearch, personLookup, persons, sections }) => {
    const classes = useStyles();

    // scroll to selected person by link ID
    const { personId } = useParams();
    const selectedPerson = useRef(null);
    const childRef = useRef(null);
    useLayoutEffect(() => {
        if (selectedPerson.current && childRef.current) {
            // wait to scroll until selected person and children have been rendered
            window.scrollTo({
                top:
                    selectedPerson.current.getBoundingClientRect().top +
                    window.scrollY,
            });
        } else if (childRef.current && !personId) {
            // scroll to top on load if no person ID selected
            window.scrollTo({ top: 0 });
        }
    }, [selectedPerson.current, childRef.current]);

    return (
        <>
            <EditionHeader onSearch={onSearch} />
            <Container className={classes.root}>
                <Typography
                    variant="h4"
                    className={classes.header}
                    component="h2"
                >
                    Persons
                </Typography>
                <List className={classes.list}>
                    {persons
                        .sort((a, b) =>
                            // sort by name
                            a.properties.identifier.localeCompare(
                                b.properties.identifier
                            )
                        )
                        .map((person) => (
                            <li
                                className={classes.listItem}
                                key={person.id}
                                ref={
                                    personId &&
                                    person.links.find(
                                        (l) =>
                                            l.target.toString() ===
                                            personId.toString()
                                    )
                                        ? selectedPerson
                                        : null
                                }
                                id={person.id}
                            >
                                <Card>
                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            component="h3"
                                        >
                                            {person.properties.identifier}
                                        </Typography>
                                        {processLinks(
                                            person.links,
                                            personLookup,
                                            sections
                                        ).length > 0 && (
                                            <>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    color="textPrimary"
                                                >
                                                    In edition:
                                                    <ul>
                                                        {processLinks(
                                                            person.links,
                                                            personLookup,
                                                            sections
                                                        ).map((link) => (
                                                            <li
                                                                key={
                                                                    link.sectionId
                                                                }
                                                                ref={childRef}
                                                            >
                                                                <a
                                                                    href={`/#/Edition/${link.sectionId}`}
                                                                >
                                                                    {link.title}
                                                                </a>{" "}
                                                                (
                                                                {link.type.toLowerCase()}
                                                                )
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </Typography>
                                            </>
                                        )}
                                    </CardContent>
                                    <CardActions
                                        className={classes.cardActions}
                                    >
                                        {person.properties.href && (
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                color="textSecondary"
                                            >
                                                Data source:{" "}
                                                {person.properties.datasource
                                                    ? person.properties
                                                          .datasource
                                                    : "external resource"}
                                            </Typography>
                                        )}
                                        {!person.properties.href &&
                                            person.properties.datasource && (
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    color="textSecondary"
                                                >
                                                    Data source:{" "}
                                                    {
                                                        person.properties
                                                            .datasource
                                                    }
                                                </Typography>
                                            )}
                                        {person.properties.href && (
                                            <Button
                                                size="small"
                                                color="primary"
                                                href={person.properties.href}
                                            >
                                                Learn More
                                            </Button>
                                        )}
                                    </CardActions>
                                </Card>
                            </li>
                        ))}
                </List>
            </Container>
        </>
    );
};

PersonsList.propTypes = {
    onSearch: PropTypes.func,
    personLookup: PropTypes.array,
    persons: PropTypes.array,
    sections: PropTypes.array,
};

export default withRouter(PersonsList);
