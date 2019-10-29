import axios from 'axios';
import { useState, useEffect } from 'react';

export function useSectionList() {
  const [sectionList, setSectionList] = useState(null);

  useEffect(() => {
    if( sectionList ) return
    const sectionListURL = `${process.env.PUBLIC_URL}/data/sections.json`;
    const handleSectionList = data => setSectionList(data)
    axios.get(sectionListURL)
        .then( response => handleSectionList(response.data) )
        .catch(console.error.bind(console))
  });

  return sectionList
}

// Turn the list of readings into the sort of text object we need.
// Return the object.
function setText(rdglist) {
  const textObj = {
    readings: [],
    witnesses: []
  };
  const startRdg = rdglist.find(x => x.is_start);
  if (!startRdg) {
    console.error("No start reading found in reading list!");
  } else {
    textObj.readings = rdglist;
    textObj.witnesses = startRdg.witnesses;
  }
  return textObj;
};

// Given a sigil and a list of readings, return an object suitable to
// be an activeWitness.
function setWitness(sigil, rdglist) {
  const filterCondition = sigil === 'Lemma text'
    ? (r) => r.is_lemma && !r.is_start && !r.is_end
    : (r) => r.witnesses.includes(sigil) && !r.is_start && !r.is_end;
  const witReadings = rdglist.filter(filterCondition);
  witReadings.sort((first, second) => first.rank - second.rank)
  return {
    sigil: sigil,
    readings: witReadings
  };
}

// Load all text and witness data 
export function useSection(sectionID) {
  const [section, setSection] = useState(null);

  useEffect(() => {
    if( section && sectionID === section.section ) return

    const sectionURL = `${process.env.PUBLIC_URL}/data/${sectionID}`
    const readingsURL = `${sectionURL}/readings.json`
    const translationURL = `${sectionURL}/translation.html`
    const lemmaTextURL = `${sectionURL}/lemmaText.html`
  
    const handleSection = data => setSection(data)

    axios.all([
      axios.get(readingsURL),
      axios.get(translationURL),
      axios.get(lemmaTextURL)
    ])
    .then(axios.spread(function(readingsResponse, translationResponse, lemmaResponse) {
      const readings = readingsResponse.data
      const textObj = setText(readings)
			const witnessObj = setWitness("Lemma text", readings)
      textObj.translation = translationResponse.data
      textObj.lemmaText = lemmaResponse.data
      handleSection({
        section: sectionID,
        text: textObj,
        activeWitness: witnessObj,
        activeNode: null,
        highlightedNodes: [],
      })
    }))
    .catch(console.error.bind(console))
  })

  return section
}

	// // Event handlers to pass around
	// handleSetActiveWitness = sigil =>
	// 	this.setState({ activeWitness: this.setWitness(sigil, this.state.text.readings) });

	// handleSetActiveNode = nodeid => {
	// 	// The active node, as well as the hilighted nodes around it
	// 	if (!this.state.activeWitness) {
	// 		console.error("Cannot have an active node without an active witness");
	// 		this.setState({
	// 			activeNode: null,
	// 			highlightedNodes: []
	// 		});
	// 	} else {
	// 		// Find the index of the selected node
	// 		let witReadings = this.state.activeWitness.readings;
	// 		const idx = witReadings.findIndex(r => r.id === nodeid);
	// 		const textLen = witReadings.length;
	// 		if (idx < 0) {
	// 			console.error("Selected active node is not in the active witness");
	// 			this.setState({
	// 				activeNode: null,
	// 				highlightedNodes: []
	// 			});
	// 		} else {
	// 			const floor = idx < 3 ? 0 : idx - 3;
	// 			const ceiling = idx > textLen - 3 ? textLen : idx + 3;
	// 			const highlightedNodes = witReadings.slice(floor,ceiling);
	// 			this.setState({
	// 				activeNode: nodeid,
	// 				highlightedNodes: highlightedNodes
	// 			});
	// 		}
	// 	}
	// }