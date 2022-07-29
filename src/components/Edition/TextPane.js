import React, {useState, useEffect} from "react";
import Parser , {domToReact} from 'html-react-parser';
import * as DataApi from '../../utils/Api';
import Typography from '@material-ui/core/Typography'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away-extreme.css';


const TextPane =(props) => {

      const {sectionId, reading, onSelectNode, onSelectLocation, selectedSentence, onSelectSentence,
      persons, places, comments, dates, graphVisible, searchTerm, manuscripts, nodeHash, selectedTimestamp} = props;

      const [enTitle, setEnTitle] = useState();
      const [arTitle, setArTitle] = useState();
      const [textHTML, setTextHTML] = useState('');
      const [manuscriptName, setManuscriptName] = useState();
      const [manuscriptPlaceDate, setManuscriptPlaceDate] = useState();

      const parserOptions = {
            replace: function({attribs,children}) {

                  if( attribs && attribs.id ){// the translation and armenian texts are encode with nodeId and rank
                              let rank = reading ==="Translation" ? attribs.id.split('-')[0] : attribs.key;
                              let nodeId = reading ==="Translation" ? attribs.id.split('-')[1] : attribs.id;

// this can be further refactored - it was in transition...
                              if( reading === "Translation"){
                                    let selected= props.selectedSentence ? props.selectedSentence.startId === nodeId  : false;
                                    let searchedFor = searchTerm? children[0].data.indexOf(searchTerm) > -1 ? true:false:false;
                                    if(selected || searchedFor) {
                                                return <span style={{backgroundColor:'#F2F19C'}} onClick={()=>{ handleHighlight(attribs.id, attribs.key)}} >
                                                      {domToReact(children,parserOptions)}</span>
                                    } else {
                                                return <span onClick={()=>{ handleHighlight(attribs.id, attribs.key)}}>
                                                      {domToReact(children,parserOptions)}</span>
                                    }
                              } else {
                                    let isSearchTerm = searchTerm? children[0].data === searchTerm ? true: false : false;
                                    if( isSearchTerm)
                                          onSelectNode(nodeId);
                                    let atRank = props.selectedRank? props.selectedRank === parseInt(rank) : false;
                                    let selected= props.selectedNode ? props.selectedNode.nodeId === nodeId : false;
                                    let person =persons? persons.find( p=>{return isWithinRange(p.begin, p.end, nodeId) }) : false ;
                                    let comment = comments.find( c=>{return isWithinRange(c.begin, c.end, nodeId) });
                                    let place = places? places.find( p=>{return isWithinRange(p.begin, p.end, nodeId) }) : false ;
                                    let date =dates ? dates.find( d=> {return isWithinRange(d.begin, d.end, nodeId) } ) : false;
                                    let inSelectedSentence = props.selectedSentence? (parseInt(rank) >= parseInt(selectedSentence.startRank) && parseInt(rank)<= parseInt(selectedSentence.endRank) ) : false;
                                    let textStyle={
                                          color: 'black',
                                          backgroundColor: isSearchTerm?'#D4FCA4':selected?'#D4FCA4':person ? '#D1F3FA' : place ? '#F3E3FB' : date ? '#FAD3C3' :inSelectedSentence ? '#F2F19C':atRank?'#D4FCA4': 'transparent',
                                          borderBottom: comment ? '2px dotted blue' : 'none'
                                    }
                                    if (comment) {
                                      return <Tippy content={<span>{comment.text}</span>} animation={'shift-away-extreme'}>
                                        <span style={textStyle} onClick={()=>{handleSelected({nodeId:nodeId, rank:rank, place: place})}} >
                                            {domToReact(children,parserOptions)}
                                          </span>
                                      </Tippy>
                                    } else {
                                          return <span style={textStyle} onClick={()=>{handleSelected({nodeId:nodeId, rank:rank, place: place})}} >
                                                {domToReact(children,parserOptions)}</span>
                                    }

                              }

                  }
            }
      }

      useEffect(()=>{
            if(!props.sections)
            return;
            const selectedSection = props.sections.find( s =>{
                  return s.sectionId === sectionId;
            });
            if(selectedSection){
                  setEnTitle(selectedSection.englishTitle);
                  setArTitle(selectedSection.armenianTitle);
            }
      },[sectionId,props.sections])

      useEffect(()=>{
            DataApi.getReading(sectionId,props.reading, (html)=>{
                  let parsed = Parser(html, parserOptions)
                  setTextHTML(parsed)
            }, selectedTimestamp);
            lookupManuscriptName(props.reading)
      },[props, selectedTimestamp])

      return (
           <div style={{marginRight:'12px'}}>
                        <Typography variant="h5" style={{textAlign:'center'}}>
                              {manuscriptName}
                        </Typography>
                        <Typography variant="h6" style={{textAlign:'center'}}>
                              {manuscriptPlaceDate}
                        </Typography>
                        <Typography variant="h5" style={{textAlign:'center', marginBottom:'6px'}}>
                              { enTitle? reading === "Translation" ? enTitle.split("(")[0]?enTitle.split("(")[0]: enTitle :arTitle.split("(")[0] ? arTitle.split("(")[0] : arTitle : ''}
                        </Typography>
                        <Typography variant="h6" style={{textAlign:'center'}}>
                              {enTitle? reading ==="Translation" ? enTitle.split("(")[1] ? enTitle.split("(")[1].replace(")","") : enTitle : arTitle.split("(")[1] ? arTitle.split("(")[1].replace(")","") :arTitle:''}
                        </Typography>

                      <div style={{whiteSpace:'pre-line',marginTop:'16px', marginLeft:'32px', }}>
                              <Typography variant="h6" >
                                    { textHTML }
                             </Typography>

                      </div>

           </div>
          )


      function isWithinRange(startNodeId, endNodeId, nodeId ){
            let withinRange = false;


            try{
            const startRank = nodeHash[startNodeId].rank;
            if(!startRank)
                  return;
            const endRank = nodeHash[endNodeId].rank;
            if(! endRank)
            return;
  // it appears some of these are backwards in the database
            const validStart = startRank < endRank ? startRank:endRank;
            const validEnd = endRank > startRank ? endRank: startRank;
if(validStart !== startRank || validEnd !== endRank)
console.log("begin end targets were reversed in section"+ sectionId )

            const nodeRank = nodeHash[nodeId].rank;
            if(! nodeRank)
            return;

            if( nodeRank >= validStart && nodeRank <=validEnd)
                  withinRange = true;
            } catch(error){
                  console.log( `error: startNodeId ${startNodeId} end ${endNodeId}  ${error.message}`)
            }
            return withinRange;
      }

      function lookupManuscriptName(sigil){
            let sigilLabel = sigil === "Translation" ? "Lemma Translation" : sigil;
            let msDescription = manuscripts? manuscripts.find( m=>{return m.id === sigilLabel}):null;
            let descText = msDescription? ` MS ${msDescription.idno}  (sigil: ${sigilLabel})`:`sigil: ${sigilLabel} `
            let placeDate = msDescription? `${msDescription.settlement} ${msDescription.origPlace?msDescription.origPlace:''} ${msDescription.origDate?msDescription.origDate:''}`:''
            setManuscriptName(descText )
            setManuscriptPlaceDate(placeDate)
      }

          // contains rank and id
      function handleHighlight( startNodeId, endNodeId){
            onSelectSentence(startNodeId, endNodeId)
      }

      function handleSelected( node){
            if(node.place)
                  onSelectLocation(node);
            else {
                  if(graphVisible)
                        onSelectNode(node);
            }

      }


}

export default TextPane;
