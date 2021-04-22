import axios from 'axios';

const localUrl = window.location.hostname==='localhost'?'http://localhost:3000/':`${process.env.PUBLIC_URL}/`
//const sectionListURL = `${process.env.PUBLIC_URL}/data/sections.json`;

export const getSectionList = async ( onListReceived, timestamp )=>{
      const sectionListURL = `${localUrl}data/${timestamp}/sections.json`;
      try{
            const result = await axios.get(sectionListURL);
            onListReceived(result.data)
      } catch( error ) {
            console.log(error)
      }
}

export const getWitnessList = async ( onListReceived, timestamp )=>{
      const witnessListURL = `${localUrl}data/${timestamp}/witnesses.json`;
      try{
            const result = await axios.get(witnessListURL);
            onListReceived(result.data)
      } catch( error ) {
            console.log(error)
      }
}

export const getNodeLookup = async ( sectionId, onListReceived, timestamp )=>{
      const nodeListURL = `${localUrl}data/${timestamp}/${sectionId}/readings.json`;
      try{
            const result = await axios.get(nodeListURL);
            onListReceived(result.data)
      } catch( error ) {
            console.log(error)
      }
}

export const getRankReport = async ( sectionId, onListReceived, timestamp )=>{
      const rankReportURL = `${localUrl}data/${timestamp}/${sectionId}/ranks.json`;
      try{
            const result = await axios.get(rankReportURL);
            onListReceived(result.data)
      } catch( error ) {
            console.log(error)
      }
}

export const getPersons = async ( sectionId, onListReceived, timestamp )=>{
      const personListURL = `${localUrl}data/${timestamp}/${sectionId}/persons.json`;
      try{
            const result = await axios.get(personListURL);
            onListReceived(result.data)
      } catch( error ) {
            console.log(error)
      }
}

export const getPlaces = async ( sectionId, onListReceived, timestamp )=>{
      const placeListURL = `${localUrl}data/${timestamp}/${sectionId}/places.json`;
      try{
            const result = await axios.get(placeListURL);
            onListReceived(result.data)
      } catch( error ) {
            console.log(error)
      }
}

export const getComments = async ( sectionId, onListReceived, timestamp ) => {
  const commentListURL = `${localUrl}data/${timestamp}/${sectionId}/comments.json`;
  try {
    const result = await axios.get(commentListURL);
    onListReceived(result.data)
  } catch(error) {
      console.log(error)
  }
}

export const getDates = async ( sectionId, onListReceived, timestamp )=>{
      const dateListURL = `${localUrl}data/${timestamp}/${sectionId}/dates.json`;
      try{
            const result = await axios.get(dateListURL);
            onListReceived(result.data)
      } catch( error ) {
            console.log(error)
      }
}

export const getTimelineDates = async (onListReceived, timestamp) => {
  const timelineListURL = `${localUrl}data/${timestamp}/chronicleDates.json`;
  try {
    const result = await axios.get(timelineListURL);
    onListReceived(result.data);
  } catch(error) {
    console.log(error);
  }
};

export const getReading = async ( sectionId, reading, onTextReceived, timestamp )=>{
      reading = reading === "Lemma Text" ? "lemma": reading;
      reading = reading === "Translation"? "en":reading;
      const readingURL = `${localUrl}data/${timestamp}/${sectionId}/${reading}.html`;
      try{
            const result = await axios.get(readingURL);
            onTextReceived(result.data)
      } catch( error ) {
            console.log(error)
      }
}

export const getManuscript = async ( manuscriptId, onTextReceived )=>{
      const manuscriptFile = `${localUrl}/images/mss/${manuscriptId}/${manuscriptId}.html`;
      try{
            const result = await axios.get(manuscriptFile);
            onTextReceived(result.data)
      } catch( error ) {
            console.log(error)
      }
}

export const getTranslationIndex = async( onIndexReceived, timestamp )=>{
      const indexFile = `${localUrl}data/${timestamp}/lunrIndex.json`;
      try{
            const result = await axios.get(indexFile);
            onIndexReceived(result.data)
      } catch( error ) {
            console.log(error)
      }
}

export const getArmenianIndex = async( onIndexReceived, timestamp )=>{
      const indexFile = `${localUrl}data/${timestamp}/lunrArmenianIndex.json`;
      try{
            const result = await axios.get(indexFile);
            onIndexReceived(result.data)
      } catch( error ) {
            console.log(error)
      }
}


export const getLunrData = async( onDataReceived, timestamp )=>{
      const dataFile = `${localUrl}data/${timestamp}/lunrData.json`;
      try{
            const result = await axios.get(dataFile);
            onDataReceived(result.data)
      } catch( error ) {
            console.log(error)
      }
}

export const getLunrArmenianData = async( onDataReceived, timestamp )=>{
      const dataFile = `${localUrl}data/${timestamp}/lunrArmenianData.json`;
      try{
            const result = await axios.get(dataFile);
            onDataReceived(result.data)
      } catch( error ) {
            console.log(error)
      }
}

//from the stemmarest api where annotations?label=PLACE
// the target property refrences a PLACEREF - see below
export const getLocationData = async( onDataReceived, timestamp )=>{
      const dataFile = `${localUrl}data/${timestamp}/locations.json`;
      try{
            const result = await axios.get(dataFile);
            onDataReceived(result.data)
      } catch( error ) {
            console.log(error)
      }
}

//from the stemmarest api where annotations?label=PLACEREF and sectionId is specified
// the target property references a text nodeId
export const getLocationLookup = async( onDataReceived, timestamp )=>{
      const dataFile = `${localUrl}data/${timestamp}/locationLookup.json`;
      try{
            const result = await axios.get(dataFile);
            onDataReceived(result.data)
      } catch( error ) {
            console.log(error)
      }

}

export const getManuscriptLookup = async( onDataReceived, timestamp )=>{
      const dataFile = `${localUrl}data/${timestamp}/sigilLookup.json`;
      try{
            const result = await axios.get(dataFile);
            onDataReceived(result.data)
      } catch( error ) {
            console.log(error)
      }
}

export const getManuscriptImage = async( dirName,onDataReceived)=>{
      const dataFile = `${localUrl}images/mss/${dirName}/${dirName}.tei.images.html`;
      try{
            const result = await axios.get(dataFile);
            onDataReceived(result.data)
      } catch( error ) {
            console.log(error)
      }
}

export const getTimestampsList = async(updateList, updateSelection )=>{
  const dataFile = `${localUrl}data/timestampsList.json`;
  try {
    const result = await axios.get(dataFile);
    updateList(result.data);
    updateSelection(result.data[0].value);
  } catch(error) {
    console.log(error)
  }
}
