import React from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom'

import TextPane from "./TextPane";
import { useSection } from "./StemmaRestHooks"

function renderLegend() {
	return (
		<div className="legend">
			<h2>Legend</h2>
		</div>
	)
}

function renderSectionList(sectionList) {
	const sections = sectionList.map( s => 
		<li key={s.id} value={s.id} >
			<Link to={`/edition/${s.id}`}>{s.displayName}</Link>
		</li>
	)

	return (
		<div className='section-list'>
			<h2>Index</h2>
			<ul>
				{ sections }
			</ul>
		</div>
	);
}

export default function CriticalEdition(props) {
	const section = useSection(props.sectionID)

	return (
		<div className="app">
			<h1>The Critical Edition and Translation</h1>
			<p>Short abstract</p>
			<div className="sidebar">
				{ renderLegend() }
				{ renderSectionList(props.sectionList) }
			</div>
			{ section ?
				<div>
					<TextPane
						text={section.text}
						activeNode={section.activeNode}
						activeWitness={section.activeWitness}
						onSetActiveNode={()=>{}}
						onSetActiveWitness={()=>{}}
						highlightedNodes={[]}
					/>
					<p>{`section #${section.section}`}</p>
				</div>
				:
				<div></div> 
			}
		</div>
	);
}

CriticalEdition.propTypes = {
	sectionID: PropTypes.string,
	sectionList: PropTypes.array
};