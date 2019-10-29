import React from "react";
import PropTypes from "prop-types";
import ReactSVG from 'react-svg';

let closest = (el, selector) => {
	while (el) {
		if (el.matches && el.matches(selector)) {
			return el;
		} else {
			el = el.parentNode;
		}
	}
}

class Svg extends React.Component {

	beforeInjection = (svg) => {
		// Scale the graph so that its height is half the window height
		const graphHeight = parseFloat(svg.getAttribute('height'));
		const graphWidth = parseFloat(svg.getAttribute('width'));
		const scale = window.innerHeight / (graphHeight * 2);
		svg.setAttribute('width', graphWidth * scale);
		svg.setAttribute('height', graphHeight * scale);
	}

	handleClick = (ev) => {
		const nodeGroup = (closest(ev.target, "g.node"));

		if (nodeGroup != null) {
			// The reading ID to report is the content of the group's <title> element
			const rid = nodeGroup.getElementsByTagName('title')[0].innerHTML;
			return this.props.onSetActiveNode(rid);
		}
	}

	render() {
		// Turn the SVG string into a React element
		const svgurl = process.env.PUBLIC_URL + '/data/' + this.props.section
			+ '/graph.svg';
		return (
			<ReactSVG
				src={svgurl}
				beforeInjection={this.beforeInjection}
				onClick={this.handleClick}
			/>
		);

	}
}

Svg.propTypes = {
	section: PropTypes.string,
	onSetActiveNode: PropTypes.func
};

export default Svg;
