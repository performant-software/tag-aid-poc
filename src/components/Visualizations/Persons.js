import React, { useCallback, useLayoutEffect, useRef } from "react";
import PropTypes from "prop-types";
import EditionHeader from "./../Edition/EditionHeader";
import { withRouter } from "react-router-dom";
import { useParams } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
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
                top: selectedPerson.current.getBoundingClientRect().top,
            });
        }
    }, [selectedPerson.current, childRef.current]);

    return (
        <React.Fragment>
            <EditionHeader onSearch={onSearch} />
            <List>
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
                                alignItems="flex-start"
                            >
                                <ListItemText
                                    primary={person.properties.identifier}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                color="textPrimary"
                                            >
                                                {person.properties.datasource}
                                            </Typography>
                                            {person.properties.href}
                                            <br />
                                            <ul>
                                                {processLinks(
                                                    person.links,
                                                    personLookup,
                                                    sections
                                                ).map((link) => (
                                                    <li
                                                        key={link.sectionId}
                                                        ref={childRef}
                                                    >
                                                        <a
                                                            href={`/#/Edition/${link.sectionId}`}
                                                        >
                                                            {link.title}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                        </React.Fragment>
                    ))}
            </List>
        </React.Fragment>
    );
};

PersonsList.propTypes = {
    onSearch: PropTypes.func,
    personLookup: PropTypes.array,
    persons: PropTypes.array,
    sections: PropTypes.array,
};

export default withRouter(PersonsList);
