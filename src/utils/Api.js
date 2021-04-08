import axios from 'axios';

const localUrl = window.location.hostname==='localhost'?'http://localhost:3000/':`${process.env.PUBLIC_URL}/`
//const sectionListURL = `${process.env.PUBLIC_URL}/data/sections.json`;

export const getSectionList = async ( onListReceived )=>{
      const sectionListURL = `${localUrl}data/sections.json`;
      try{
            const result = await axios.get(sectionListURL);
            onListReceived(result.data)
      } catch( error ) {
            console.log(error)
      }
}

export const getWitnessList = async ( onListReceived )=>{
      const witnessListURL = `${localUrl}data/witnesses.json`;
      try{
            const result = await axios.get(witnessListURL);
            onListReceived(result.data)
      } catch( error ) {
            console.log(error)
      }
}

export const getNodeLookup = async ( sectionId, onListReceived )=>{
      const nodeListURL = `${localUrl}data/${sectionId}/readings.json`;
      try{
            const result = await axios.get(nodeListURL);
            onListReceived(result.data)
      } catch( error ) {
            console.log(error)
      }
}

export const getRankReport = async ( sectionId, onListReceived )=>{
      const rankReportURL = `${localUrl}data/${sectionId}/ranks.json`;
      try{
            const result = await axios.get(rankReportURL);
            onListReceived(result.data)
      } catch( error ) {
            console.log(error)
      }
}

export const getPersons = async ( sectionId, onListReceived )=>{
      const personListURL = `${localUrl}data/${sectionId}/persons.json`;
      try{
            const result = await axios.get(personListURL);
            onListReceived(result.data)
      } catch( error ) {
            console.log(error)
      }
}

export const getPlaces = async ( sectionId, onListReceived )=>{
      const placeListURL = `${localUrl}data/${sectionId}/places.json`;
      try{
            const result = await axios.get(placeListURL);
            onListReceived(result.data)
      } catch( error ) {
            console.log(error)
      }
}

export const getComments = async ( sectionId, onListReceived ) => {
  const commentListURL = `${localUrl}data/${sectionId}/comments.json`;
  try {
    const result = await axios.get(commentListURL);
    onListReceived(result.data)
  } catch(error) {
      console.log(error)
  }
}

export const getDates = async ( sectionId, onListReceived )=>{
      const dateListURL = `${localUrl}data/${sectionId}/dates.json`;
      try{
            const result = await axios.get(dateListURL);
            onListReceived(result.data)
      } catch( error ) {
            console.log(error)
      }
}

export const getTimelineDates = async (onListReceived) => {
  const timelineListURL = `${localUrl}data/chronicleDates.json`;
  try {
    const result = await axios.get(timelineListURL);
    onListReceived(result.data);
  } catch(error) {
    console.log(error);
  }
};


export const getReading = async ( sectionId, reading, onTextReceived )=>{
      reading = reading === "Lemma Text" ? "lemma": reading;
      reading = reading === "Translation"? "en":reading;
      const readingURL = `${localUrl}data/${sectionId}/${reading}.html`;
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

export const getTranslationIndex = async( onIndexReceived )=>{
      const indexFile = `${localUrl}data/lunrIndex.json`;
      try{
            const result = await axios.get(indexFile);
            onIndexReceived(result.data)
      } catch( error ) {
            console.log(error)
      }
}

export const getArmenianIndex = async( onIndexReceived )=>{
      const indexFile = `${localUrl}data/lunrArmenianIndex.json`;
      try{
            const result = await axios.get(indexFile);
            onIndexReceived(result.data)
      } catch( error ) {
            console.log(error)
      }
}


export const getLunrData = async( onDataReceived )=>{
      const dataFile = `${localUrl}data/lunrData.json`;
      try{
            const result = await axios.get(dataFile);
            onDataReceived(result.data)
      } catch( error ) {
            console.log(error)
      }
}

export const getLunrArmenianData = async( onDataReceived )=>{
      const dataFile = `${localUrl}data/lunrArmenianData.json`;
      try{
            const result = await axios.get(dataFile);
            onDataReceived(result.data)
      } catch( error ) {
            console.log(error)
      }
}

//from the stemmarest api where annotations?label=PLACE
// the target property refrences a PLACEREF - see below
export const getLocationData = async( onDataReceived)=>{
      const dataFile = `${localUrl}data/locations.json`;
      try{
            const result = await axios.get(dataFile);
            onDataReceived(result.data)
      } catch( error ) {
            console.log(error)
      }
}

//from the stemmarest api where annotations?label=PLACEREF and sectionId is specified
// the target property references a text nodeId
export const getLocationLookup = async( onDataReceived)=>{
      const dataFile = `${localUrl}data/locationLookup.json`;
      try{
            const result = await axios.get(dataFile);
            onDataReceived(result.data)
      } catch( error ) {
            console.log(error)
      }

}

export const getManuscriptLookup = async( onDataReceived)=>{
      const dataFile = `${localUrl}data/sigilLookup.json`;
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






