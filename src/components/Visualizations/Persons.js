import React, { useLayoutEffect, useRef } from "react";
import PropTypes from "prop-types";
import EditionHeader from "./../Edition/EditionHeader";
import { withRouter } from "react-router-dom";
import { useParams } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

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

const PersonsList = ({ onSearch, personLookup, persons, sections }) => {
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
        }
    }, [selectedPerson.current, childRef.current]);

    return (
        <>
            <EditionHeader onSearch={onSearch} />
            <Container style={{ maxWidth: "72ch" }}>
                <Typography
                    variant="h4"
                    style={{
                        textAlign: "center",
                        margin: "30px 0px 10px 0px",
                    }}
                >
                    Persons
                </Typography>
                <List
                    style={{
                        width: "100%",
                        maxWidth: "72ch",
                    }}
                >
                    {persons
                        .sort((a, b) =>
                            // sort by name
                            a.properties.identifier.localeCompare(
                                b.properties.identifier
                            )
                        )
                        .map((person) => (
                            <React.Fragment key={person.id}>
                                <ListItem
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
                                    alignItems="center"
                                >
                                    <ListItemText
                                        primary={person.properties.identifier}
                                        primaryTypographyProps={{
                                            variant: "h6",
                                        }}
                                        secondary={
                                            <React.Fragment>
                                                {person.properties.href && (
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        color="textPrimary"
                                                    >
                                                        Data source:{" "}
                                                        <a
                                                            href={
                                                                person
                                                                    .properties
                                                                    .href
                                                            }
                                                        >
                                                            {person.properties
                                                                .datasource
                                                                ? person
                                                                      .properties
                                                                      .datasource
                                                                : "external resource"}
                                                        </a>
                                                    </Typography>
                                                )}
                                                {!person.properties.href &&
                                                    person.properties
                                                        .datasource && (
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            color="textPrimary"
                                                        >
                                                            Data source:{" "}
                                                            {
                                                                person
                                                                    .properties
                                                                    .datasource
                                                            }
                                                        </Typography>
                                                    )}
                                                {processLinks(
                                                    person.links,
                                                    personLookup,
                                                    sections
                                                ).length > 0 && (
                                                    <>
                                                        {(person.properties
                                                            .href ||
                                                            person.properties
                                                                .datasource) && (
                                                            <br />
                                                        )}
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            color="textPrimary"
                                                        >
                                                            Textual references:
                                                        </Typography>
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
                                                                    ref={
                                                                        childRef
                                                                    }
                                                                >
                                                                    <a
                                                                        href={`/#/Edition/${link.sectionId}`}
                                                                    >
                                                                        {
                                                                            link.title
                                                                        }
                                                                    </a>{" "}
                                                                    (
                                                                    {link.type.toLowerCase()}
                                                                    )
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </>
                                                )}
                                            </React.Fragment>
                                        }
                                        secondaryTypographyProps={{
                                            component: "span",
                                        }}
                                    />
                                </ListItem>
                                <Divider />
                            </React.Fragment>
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
