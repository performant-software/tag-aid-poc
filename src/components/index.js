import React from "react";
import PropTypes from "prop-types";
import './index.css';
import Graph from "./graph";
import HeatMap from "./heatmap";
import TextPane from "./text";

class App extends React.Component {
	constructor(props, context) {
		super(props, context);

		// Initialize state
		this.state = {
			text: {readings: [], witnesses: []},
			activeWitness: {readings: []},
			highlightedNodes: []
		};
	}

	onSelectSection = evt => {
		const section = evt.target.value;
		this.selectSection(section);
	}

	// Re-load all text and witness data when the section changes.
	selectSection(section) {
		const rdglisturl = process.env.PUBLIC_URL + '/data/'
			+ section + '/readings.json';
		fetch(rdglisturl)
		.then(r => r.json())
		.then(rdgs => {
			const textObj = this.setText(rdgs)
			const witnessObj = this.setWitness("Lemma text", rdgs)
			this.setState({
				section: section,
				text: textObj,
				activeWitness: witnessObj,
				activeNode: null,
				highlightedNodes: [],
			});
		})
		.catch(console.error.bind(console));
	};

	// Turn the list of readings into the sort of text object we need.
	// Return the object.
	setText = rdglist => {
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
	setWitness = (sigil, rdglist) => {
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

	// Event handlers to pass around
	handleSetActiveWitness = sigil =>
		this.setState({ activeWitness: this.setWitness(sigil, this.state.text.readings) });

	handleSetActiveNode = nodeid => {
		// The active node, as well as the hilighted nodes around it
		if (!this.state.activeWitness) {
			console.error("Cannot have an active node without an active witness");
			this.setState({
				activeNode: null,
				highlightedNodes: []
			});
		} else {
			// Find the index of the selected node
			let witReadings = this.state.activeWitness.readings;
			const idx = witReadings.findIndex(r => r.id === nodeid);
			const textLen = witReadings.length;
			if (idx < 0) {
				console.error("Selected active node is not in the active witness");
				this.setState({
					activeNode: null,
					highlightedNodes: []
				});
			} else {
				const floor = idx < 3 ? 0 : idx - 3;
				const ceiling = idx > textLen - 3 ? textLen : idx + 3;
				const highlightedNodes = witReadings.slice(floor,ceiling);
				this.setState({
					activeNode: nodeid,
					highlightedNodes: highlightedNodes
				});
			}
		}
	}

	renderViz() {
		return (
			<div className="app">
				<div className="picker">
				  <select onChange={this.onSelectSection}>
						<option key="0" value="">Select a section...</option>
						{this.props.sectionList.map(
							s => <option key={s.id} value={s.id} >{s.name}</option>)}
					</select>
				</div>
				<Graph
					section={this.state.section}
					activeNode={this.state.activeNode}
					onSetActiveNode={this.handleSetActiveNode}
					highlightedNodes={this.state.highlightedNodes}
				/>
				<HeatMap
					text={this.state.text}
					activeNode={this.state.activeNode}
					activeWitness={this.state.activeWitness}
					onSetActiveNode={this.handleSetActiveNode}
					highlightedNodes={this.state.highlightedNodes}
				/>
				<TextPane
					text={this.state.text}
					activeNode={this.state.activeNode}
					activeWitness={this.state.activeWitness}
					onSetActiveNode={this.handleSetActiveNode}
					onSetActiveWitness={this.handleSetActiveWitness}
					highlightedNodes={this.state.highlightedNodes}
				/>
			</div>
		);
	}

	renderSectionPicker() {
		return (
			<div className="picker">
				<select onChange={this.onSelectSection}>
					<option key="0" value="">Select a section...</option>
					{this.props.sectionList.map(
						s => <option key={s.id} value={s.id} >{s.name}</option>)}
				</select>
			</div>
		)
	}

	renderLegend() {
		return (
			<div className="legend">
				<h2>Legend</h2>
			</div>
		)
	}

	renderSectionList() {
		const sections = this.props.sectionList.map( s => 
			<li onClick={this.onSelectSection} key={s.id} value={s.id} >{s.name}</li>
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

	render() {
		return (
			<div className="app">
				<h1>The Critical Edition and Translation</h1>
				<p>Short abstract</p>
				<div className="sidebar">
					{ this.renderLegend() }
					{ this.renderSectionList() }
				</div>
				<h2>{this.state.section ? this.state.section : ""}</h2>
				<TextPane
					text={this.state.text}
					activeNode={this.state.activeNode}
					activeWitness={this.state.activeWitness}
					onSetActiveNode={this.handleSetActiveNode}
					onSetActiveWitness={this.handleSetActiveWitness}
					highlightedNodes={this.state.highlightedNodes}
				/>
			</div>
		);
	}
}

App.propTypes = {
	sectionList: PropTypes.array
};


export default App;
