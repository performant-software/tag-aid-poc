import React,{useState, useEffect} from 'react';
import AboutPage from './About';
import MethodsPage from './Methods';
import ManuscriptPage from './Manuscript';
import Edition from './Edition/index';
import HomePage from './HomePage';
import EditionLanding from './EditionLanding';
import ManuscriptView from './Manuscript/ManuscriptView';
import { Route, Switch } from 'react-router-dom';
import useWindowSize from '../utils/Viewport';
import ChronicleTheme from './Theme';
import { ThemeProvider } from '@material-ui/core/styles';
import SearchResults from './Edition/SearchResults';
import * as DataApi from './../utils/Api';
import Visualizations from './Visualizations';
import Timeline from './Visualizations/Timeline';
import MapView from './Visualizations/Map';



const Routes = ( props)=>{
      const viewport = useWindowSize();
      const {sections, witnesses, manuscripts, timestampsList, selectedTimestamp, onTimestampSelect} = props;

      const [searchTerm, setSearchTerm ] = useState('');
      const [translationDictionary, setTranslationDictionary] = useState([]);
      const [translationIndex, setTranslationIndex] = useState();
      const [armenianDictionary, setArmenianDictionary] = useState([])
      const [armenianIndex, setArmenianIndex] = useState();
      const [mapFeatures,setMapFeatures] = useState([]);
      const [locationLookup, setLocationLookup]=useState([]);
      const [timelineDates, setTimelineDates] = useState([]);

      useEffect(()=>{
            if( ! translationIndex )
            DataApi.getTranslationIndex((data)=>{
                  setTranslationIndex(data )
            }, selectedTimestamp)
      },[selectedTimestamp])

      useEffect(()=>{
            if( translationDictionary.length===0 )
                  DataApi.getLunrData((data)=>{
                        setTranslationDictionary(data )
            }, selectedTimestamp)
      },[selectedTimestamp])
      useEffect(()=>{
            if( ! armenianIndex )
                  DataApi.getArmenianIndex((data)=>{
                        setArmenianIndex(data )
                  }, selectedTimestamp)
      },[selectedTimestamp])
      useEffect(()=>{
            if( armenianDictionary.length===0 )
            DataApi.getLunrArmenianData((data)=>{
                  setArmenianDictionary(data )
                }, selectedTimestamp)
      },[selectedTimestamp]);

      useEffect(()=>{
            if(mapFeatures.length===0){
                  DataApi.getLocationData((data)=>{
                        setMapFeatures(data)
                  }, selectedTimestamp)
            }
      }, [selectedTimestamp])

      useEffect(()=>{
            if(locationLookup.length===0){
                  DataApi.getLocationLookup((data)=>{
                        setLocationLookup(data)
                  }, selectedTimestamp)
            }
      }, [selectedTimestamp])

      useEffect(() => {
        if(timelineDates.length === 0) {
          DataApi.getTimelineDates((data) => {
            setTimelineDates(data);
          }, selectedTimestamp);
        }
      }, [selectedTimestamp]);



      return (
            <ThemeProvider  theme={ChronicleTheme}>
                        <Switch>
                              <Route path="/Edition/:sectionID/:witnessID" exact>
                                    <Edition manuscripts = {manuscripts} onSearch={setSearchTerm} searchTerm = {searchTerm} sections={sections}  viewport={viewport} witnesses = { witnesses} />
                              </Route>
                              <Route path="/Edition/:sectionID/:witnessID/:milestone" exact>
                                    <Edition manuscripts = {manuscripts} onSearch={setSearchTerm} searchTerm = {searchTerm} sections={sections}  viewport={viewport} witnesses = { witnesses} />
                              </Route>
                              <Route path="/Edition/:sectionID" exact>
                                    <Edition manuscripts = {manuscripts} onSearch={setSearchTerm}  searchTerm = {searchTerm} sections={sections}  viewport={viewport} witnesses = { witnesses} selectedTimestamp = {selectedTimestamp} onTimestampSelect={onTimestampSelect} timestampsList={timestampsList}/>
                              </Route>
                              <Route path="/Edition">
                                    <EditionLanding   sections={sections} onSearch={setSearchTerm}  />
                              </Route>
                              <Route path="/About" >
                                    <AboutPage onSearch={setSearchTerm} />
                              </Route>
                              <Route path="/Methods" >
                                    <MethodsPage onSearch={setSearchTerm} />
                              </Route>
                              <Route path="/Manuscripts" >
                                    <ManuscriptPage onSearch={setSearchTerm}   />
                              </Route>
                                <Route path="/ManuscriptView/:manuscriptId" exact>
                                    <ManuscriptView onSearch={setSearchTerm}   />
                              </Route>
                              <Route path="/Home" exact>
                                    <HomePage sections={sections} onSearch={setSearchTerm} />
                              </Route>
                              <Route path="/Search" exact>
                                    <SearchResults
                                          sections={sections}
                                          translationDictionary={translationDictionary} translationIndex={translationIndex}
                                          armenianDictionary = {armenianDictionary} armenianIndex={armenianIndex}
                                          onSearch={setSearchTerm} searchTerm = {searchTerm} />
                              </Route>
                              <Route path="/Visualizations/Map" exact>
                                    <MapView  onSearch={setSearchTerm} geoData= {mapFeatures} locationLookup = {locationLookup} sections={sections} />
                              </Route>
                              <Route path="/Visualizations/Map/:locationId" exact>
                                    <MapView onSearch={setSearchTerm} geoData= {mapFeatures} locationLookup = {locationLookup} sections={sections}/>
                              </Route>
                              <Route path="/Visualizations/Timeline" exact>
                                <Timeline
                                  onSearch={setSearchTerm}
                                  timelineData={timelineDates}
                                />
                              </Route>
                              <Route path="/Visualizations" exact>
                                    <Visualizations onSearch={setSearchTerm} />
                              </Route>
                               <Route path="/" exact>
                                    <HomePage  onSearch={setSearchTerm} sections={sections} />
                              </Route>
                               <Route path="/ChronicleME" exact>
                                    <HomePage  onSearch={setSearchTerm} sections={sections} />
                              </Route>
                        </Switch>
            </ThemeProvider>
      )

}
export default Routes
