import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AboutPage from "./About";
import MethodsPage from "./Methods";
import ManuscriptPage from "./Manuscript";
import Edition from "./Edition/index";
import HomePage from "./HomePage";
import EditionLanding from "./EditionLanding";
import ManuscriptView from "./Manuscript/ManuscriptView";
import { Route, Switch } from "react-router-dom";
import useWindowSize from "../utils/Viewport";
import ChronicleTheme from "./Theme";
import { ThemeProvider } from "@material-ui/core/styles";
import SearchResults from "./Edition/SearchResults";
import * as DataApi from "./../utils/Api";
import Exploration from "./Exploration";
import Timeline from "./Exploration/Timeline";
import MapView from "./Exploration/Map";
import PersonsList from "./Exploration/Persons";

const Routes = ({
    sections,
    witnesses,
    manuscripts,
    timestampsList,
    selectedTimestamp,
    onTimestampSelect,
}) => {
    const viewport = useWindowSize();

    const [searchTerm, setSearchTerm] = useState("");
    const [translationDictionary, setTranslationDictionary] = useState([]);
    const [translationIndex, setTranslationIndex] = useState();
    const [armenianDictionary, setArmenianDictionary] = useState([]);
    const [armenianIndex, setArmenianIndex] = useState();
    const [mapFeatures, setMapFeatures] = useState([]);
    const [locationLookup, setLocationLookup] = useState([]);
    const [persons, setPersons] = useState([]);
    const [personLookup, setPersonLookup] = useState([]);
    const [timelineDates, setTimelineDates] = useState([]);

    useEffect(() => {
        // fetch data when selectedTimestamp loads or is changed
        if (selectedTimestamp) {
            if (!translationIndex) {
                DataApi.getTranslationIndex((data) => {
                    setTranslationIndex(data);
                }, selectedTimestamp);
            }
            if (!translationDictionary.length) {
                DataApi.getLunrData((data) => {
                    setTranslationDictionary(data);
                }, selectedTimestamp);
            }
            if (!armenianIndex) {
                DataApi.getArmenianIndex((data) => {
                    setArmenianIndex(data);
                }, selectedTimestamp);
            }
            if (!armenianDictionary.length) {
                DataApi.getLunrArmenianData((data) => {
                    setArmenianDictionary(data);
                }, selectedTimestamp);
            }
            if (!mapFeatures.length) {
                DataApi.getLocationData((data) => {
                    setMapFeatures(data);
                }, selectedTimestamp);
            }
            if (!locationLookup.length) {
                DataApi.getLocationLookup((data) => {
                    setLocationLookup(data);
                }, selectedTimestamp);
            }
            if (!persons.length) {
                DataApi.getPersonData((data) => {
                    setPersons(data);
                }, selectedTimestamp);
            }
            if (!personLookup.length) {
                DataApi.getPersonLookup((data) => {
                    setPersonLookup(data);
                }, selectedTimestamp);
            }
            if (!timelineDates.length) {
                DataApi.getTimelineDates((data) => {
                    setTimelineDates(data);
                }, selectedTimestamp);
            }
        }
    }, [selectedTimestamp]);

    return (
        <ThemeProvider theme={ChronicleTheme}>
            <Switch>
                <Route path="/Edition/:sectionID/:witnessID" exact>
                    <Edition
                        manuscripts={manuscripts}
                        onSearch={setSearchTerm}
                        searchTerm={searchTerm}
                        sections={sections}
                        viewport={viewport}
                        witnesses={witnesses}
                    />
                </Route>
                <Route path="/Edition/:sectionID/:witnessID/:milestone" exact>
                    <Edition
                        manuscripts={manuscripts}
                        onSearch={setSearchTerm}
                        searchTerm={searchTerm}
                        sections={sections}
                        viewport={viewport}
                        witnesses={witnesses}
                    />
                </Route>
                <Route path="/Edition/:sectionID" exact>
                    <Edition
                        manuscripts={manuscripts}
                        onSearch={setSearchTerm}
                        searchTerm={searchTerm}
                        sections={sections}
                        viewport={viewport}
                        witnesses={witnesses}
                        selectedTimestamp={selectedTimestamp}
                        onTimestampSelect={onTimestampSelect}
                        timestampsList={timestampsList}
                    />
                </Route>
                <Route path="/Edition">
                    <EditionLanding
                        sections={sections}
                        onSearch={setSearchTerm}
                    />
                </Route>
                <Route path="/About">
                    <AboutPage onSearch={setSearchTerm} />
                </Route>
                <Route path="/Methods">
                    <MethodsPage onSearch={setSearchTerm} />
                </Route>
                <Route path="/Manuscripts" exact>
                    <ManuscriptPage onSearch={setSearchTerm} />
                </Route>
                <Route path="/Manuscripts/:manuscriptId" exact>
                    <ManuscriptView onSearch={setSearchTerm} />
                </Route>
                <Route path="/Home" exact>
                    <HomePage
                        sections={sections}
                        onSearch={setSearchTerm}
                        selectedTimestamp={selectedTimestamp}
                    />
                </Route>
                <Route path="/Search" exact>
                    <SearchResults
                        sections={sections}
                        translationDictionary={translationDictionary}
                        translationIndex={translationIndex}
                        armenianDictionary={armenianDictionary}
                        armenianIndex={armenianIndex}
                        onSearch={setSearchTerm}
                        searchTerm={searchTerm}
                    />
                </Route>
                <Route path="/Exploration/Map" exact>
                    <MapView
                        onSearch={setSearchTerm}
                        geoData={mapFeatures}
                        locationLookup={locationLookup}
                        sections={sections}
                    />
                </Route>
                <Route path="/Exploration/Map/:locationId" exact>
                    <MapView
                        onSearch={setSearchTerm}
                        geoData={mapFeatures}
                        locationLookup={locationLookup}
                        sections={sections}
                    />
                </Route>
                <Route path="/Exploration/Persons" exact>
                    <PersonsList
                        onSearch={setSearchTerm}
                        persons={persons}
                        personLookup={personLookup}
                        sections={sections}
                    />
                </Route>
                <Route path="/Exploration/Persons/:personId" exact>
                    <PersonsList
                        onSearch={setSearchTerm}
                        persons={persons}
                        personLookup={personLookup}
                        sections={sections}
                    />
                </Route>
                <Route path="/Exploration/Timeline" exact>
                    <Timeline
                        onSearch={setSearchTerm}
                        timelineData={timelineDates}
                    />
                </Route>
                <Route path="/Exploration" exact>
                    <Exploration onSearch={setSearchTerm} />
                </Route>
                <Route path="/" exact>
                    <HomePage
                        onSearch={setSearchTerm}
                        sections={sections}
                        selectedTimestamp={selectedTimestamp}
                    />
                </Route>
                {process.env.REACT_APP_HOMEPATH && (
                    <Route path={process.env.REACT_APP_HOMEPATH} exact>
                        <HomePage
                            onSearch={setSearchTerm}
                            sections={sections}
                            selectedTimestamp={selectedTimestamp}
                        />
                    </Route>
                )}
            </Switch>
        </ThemeProvider>
    );
};

Routes.propTypes = {
    manuscripts: PropTypes.array,
    onTimestampSelect: PropTypes.func,
    sections: PropTypes.array,
    selectedTimestamp: PropTypes.string,
    timestampsList: PropTypes.array,
    witnesses: PropTypes.array,
};

export default Routes;
