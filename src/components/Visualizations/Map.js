import React, { useRef, useEffect} from 'react';
import mapboxgl from 'mapbox-gl'
import EditionHeader from './../Edition/EditionHeader'
import {withRouter} from 'react-router-dom';
import { useParams} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const MapView = ( props)=>{

      const mapRef=useRef()
      const { geoData, locationLookup, sections, onSearch} = props;
      const homePath = window.location.hostname === "localhost" ? "/" : process.env.REACT_APP_HOMEPATH;
      let {locationId} = useParams()



      useEffect( ()=>{
            const Edessa = [37.1747759,38.7708186];
            let selectedLocation;
            if( locationId){
                  let place = geoData.find( g=> g.links.find( l => l.target.toString() === locationId.toString()) );
                 if(place && place.geometry && place.geometry[0] && place.geometry[0].geometry){
                        if(place.geometry[0].geometry.type ==="Point")
                              selectedLocation=place.geometry[0].geometry.coordinates;
                        if(place.geometry[0].geometry.type === "Polygon")
                              selectedLocation=place.representativePoint;
                 }
            }

            const mapInstance = new mapboxgl.Map({
                  attributionControl: false,
                  container: mapRef.current,
                  style:'mapbox://styles/mapbox/satellite-v9',
                  center: selectedLocation? selectedLocation:Edessa,
                  zoom:selectedLocation?11:5,
                  maxZoom:11
            });



            mapInstance.on('load', ()=>{
                  const pointData = parsePoints();
                  mapInstance.addSource('cities',
                        {
                              'type':'geojson',
                              'data' : pointData
                        });
                  mapInstance.addLayer(
                        {
                              'id':'cities',
                              'type':'symbol',
                              'source':'cities',
                              'layout': {
                                    'icon-image': '{icon}-15',
                                    'icon-allow-overlap': true,
                                    'text-field': ['get', 'title'],
                                    'text-font': ['Open Sans Bold'],
                                    'text-size':20,
                                    'text-offset': [0, 0.5],
                                    'text-anchor': 'top',
                                    },
                                    'paint':{
                                          'text-color':'#c4ed1f'
                                    }
                        }
                  );

                  mapInstance.on('click', 'cities', function(e) {
                        var coordinates = e.features[0].geometry.coordinates.slice();
                        var description = e.features[0].properties.description;

                        // Ensure that if the map is zoomed out such that multiple
                        // copies of the feature are visible, the popup appears
                        // over the copy being pointed to.
                        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                        }

                        new mapboxgl.Popup()
                        .setLngLat(coordinates)
                        .setHTML(description)
                        .addTo(mapInstance);
                  });

                  mapInstance.on('mouseenter', 'cities', function() {
                        mapInstance.getCanvas().style.cursor = 'pointer';
                  });

                  mapInstance.on('mouseleave', 'cities', function() {
                        mapInstance.getCanvas().style.cursor = '';
                  });

                  // to do generate another point layer rather than polygon
                  const polygons = parsePolygons();
                  polygons.forEach( p =>{
                  try{

                        let stupid = Math.random();
                        mapInstance.addSource(`${p.title}-${stupid.toString()}`, {
                              'type': 'geojson',
                              'data': {
                                          'type': 'Feature',
                                          'geometry': {
                                                'type': 'Point',
                                                'coordinates': p.representativePoint
                                                },
                                          'properties':{
                                                'title':p.title,
                                                'description':p.data.properties.description
                                          }
                                    }
                              });

                              mapInstance.addLayer({
                                    'id': `${p.title}-${stupid.toString()}`,
                                    'type': 'symbol',
                                    'source': `${p.title}-${stupid.toString()}`,
                                    'layout': {

                                          'text-field': ['get', 'title'],
                                          'text-size':26,
                                          'text-font': ['Open Sans Bold'],
                                          'text-offset': [0, 0.6],
                                          'text-anchor': 'top'
                                          },
                                    'paint':{
                                          'text-color':'#f29685'
                                    }
                              });

                        mapInstance.on('click', `${p.title}-${stupid.toString()}`, function(e) {
                              var coordinates = e.lngLat;
                              var description = e.features[0].properties.description;

                              // Ensure that if the map is zoomed out such that multiple
                              // copies of the feature are visible, the popup appears
                              // over the copy being pointed to.
                              while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                              coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                              }

                              new mapboxgl.Popup()
                              .setLngLat(coordinates)
                              .setHTML(description)
                              .addTo(mapInstance);
                        });

                        mapInstance.on('mouseenter', `${p.title}-${stupid.toString()}`, function() {
                              mapInstance.getCanvas().style.cursor = 'pointer';
                        });

                        mapInstance.on('mouseleave', `${p.title}-${stupid.toString()}`, function() {
                              mapInstance.getCanvas().style.cursor = '';
                        });

                  }catch(error){
                        console.log(error)
                  }

                  })// end for each poly


            })// end on load handler

      })


      return(
      <React.Fragment>
                  <EditionHeader  onSearch = {onSearch} />
                  <div ref={mapRef} style={{position:'absolute',bottom:0,top:'0px', width:'100%'}}>

                  </div>
                  <Paper elevation={2} style={{display:'flex', flexDirection:'column', justifyContent:'center',width:'400px',
                        textAlign:'center', position:'relative',top:'64px',left:'32px',backgroundColor:'rgb(255, 250, 245)',padding:'12px'}}>
                        <Typography variant="h5">
                              {'Textual Place References'}
                        </Typography>
                        <Typography variant="h6">
                              {'Years 401 - 611'}
                        </Typography>
                        <Typography variant="h6">
                              {'2 April 952 CE - 8 February 1163 CE'}
                        </Typography>

                  </Paper>
      </React.Fragment>

      )



      function parsePoints(){
           let pointData = {
                 'type':'FeatureCollection',
           }
           const pointArray=[];

           geoData.forEach( f =>{
                  const g = f.geometry[0];

                  if(g && g.geometry && g.geometry.type === "Point"){
                        const linkText = g.properties.link.indexOf('pleiades') > -1? "Pleiades": g.properties.link.indexOf("geonames" )>-1?"Geonames":"Other"
                        const sectionLinks = generateSectionLink(f.links);

                        let pointFeature = {
                              'type':'Feature',
                              'geometry':g.geometry,
                              'properties':{
                                    'title':f.title,
                                    'icon':'town-hall',
                                    'description':`<p>
                                          <h6>${f.title}</h5>
                                          <b>description: </b>${g.properties.description}<br/>
                                          <b>provenance: </b>${f.provenance}<br/>
                                          <b>link: </b><a href='${g.properties.link}'>${linkText}</a><br/>
                                          <b>snippet: </b>${g.properties.snippet?g.properties.snippet:''}<br/>
                                          <b>Text References </b>
                                          <ul>
                                                ${ sectionLinks}
                                          </ul>
                                          </p>`
                                    }
                        }
                       pointArray.push(pointFeature)
                  }// end if feature is a point

           })// end for each in geo Data
           pointData.features = pointArray;
           return pointData;
      }

      function generateSectionLink( links ){
            if( !links)
            return '';
            let innerHtml = '';
            links.forEach( link =>{
                  const lookup = locationLookup.find( l=> l.placeRefId.toString() === link.target.toString() );

                  if(lookup){
                        let titles = sections.find(s => s.sectionId === lookup.sectionId)
                        const sectionId = lookup.sectionId;
                        const englishTitle = titles && titles.englishTitle ? titles.englishTitle.substring(0,12) : "";
                        innerHtml +=`<li><a href='${homePath}#/Edition/${sectionId}'>${englishTitle}</a></li>`;
                  }
            })
            return innerHtml;
      }

      function parsePolygons(){
            const polygonArray=[];
            geoData.forEach( f =>{
                  const g = f.geometry[0];

                  if(g && g.geometry && g.geometry.type === "Polygon"){

                        const linkText = g.properties.link.indexOf('pleiades') > -1? "Pleiades": g.properties.link.indexOf("geonames" )>-1?"Geonames":"Other"
                        const sectionLinks = generateSectionLink(f.links);

                        let polygonFeature ={
                              'title':f.title,
                              'representativePoint':f.representativePoint,
                              'data': {
                                    'type':'Feature',
                                    'geometry':g.geometry,
                                    'properties':{
                                          'icon':'town-hall',
                                          'description':`<p>
                                          <h6>${f.title}</h5>
                                          <b>description: </b>${g.properties.description}<br/>
                                          <b>provenance: </b>${f.provenance}<br/>
                                          <b>link: </b><a href='${g.properties.link}'>${linkText}</a><br/>
                                          <b>snippet: </b>${g.properties.snippet?g.properties.snippet:''}<br/>
                                          <b>Text References </b>
                                          <ul>
                                                ${ sectionLinks}
                                          </ul>
                                          </p>`
                                    }
                              }// end polygonFeature

                        }// end for each polygon
                        polygonArray.push(polygonFeature)
                  }// end if feature is a polygon
           })// end for each in geo Data

           return polygonArray;

      }






}
export default withRouter(MapView)
