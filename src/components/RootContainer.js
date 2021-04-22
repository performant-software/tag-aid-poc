
import React, { useState, useEffect } from 'react';
import  * as DataApi from './../utils/Api';
import Routes from './Routes'
import { HashRouter as Router} from 'react-router-dom'


const RootContainer = ( props )=>{

      const [sectionList, setSectionList] = useState([])
      const [witnessList, setWitnessList] = useState([])
      const [manuscriptLookup, setManuscriptLookup] = useState([]);
      const [timestampsList, setTimestampsList] = useState([]);
      const [selectedTimestamp, setSelectedTimestamp] = useState();

      useEffect(()=>{
        DataApi.getTimestampsList( setTimestampsList, setSelectedTimestamp)
      },[])
      useEffect( ()=>{
        DataApi.getSectionList( setSectionList, selectedTimestamp );
      },[selectedTimestamp])
      useEffect( ()=>{
            DataApi.getWitnessList( setWitnessList, selectedTimestamp  )
        },[selectedTimestamp])
        useEffect(()=>{
                  DataApi.getManuscriptLookup( setManuscriptLookup, selectedTimestamp)
      },[selectedTimestamp])

      return (
            <Router>

                  <Routes
                        sections = {sectionList}
                        witnesses = {witnessList}
                        manuscripts = {manuscriptLookup}
                        timestampsList = {timestampsList}
                        selectedTimestamp={selectedTimestamp}
                        onTimestampSelect={setSelectedTimestamp}
                  />
            </Router>
      )


}
export default RootContainer;
