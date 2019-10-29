// TODO highlight the activeWitness (in the graph)

import React from "react";
import PropTypes from "prop-types";
import GraphSvg from "./Svg";
import cx from "classnames";

class Graph extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			left: 0
		};
	}

	componentDidUpdate(prevProps) {
		if (this.props.activeNode !== prevProps.activeNode) {
			const nodes = this.props.highlightedNodes;

			if (nodes.length) {
				this.highlightNodes(nodes);
				// this.resizeGraph(nodes);
				this.centerOnActiveNodes(nodes);
			}
		}
	}

	getActiveGraphNode = (rid) => {
		// SVG node IDs are prefixed with 'n' relative to reading node IDs
		let nid = 'n' + rid;
		return this.refs.graph.querySelector(`g#${nid}`);
	}

	highlightNodes(nodes) {
		let nodeEls = this.refs.graph.querySelectorAll("g.node.highlight");

		[].forEach.call(nodeEls, function(n) {
			n.setAttribute("class", "node");
		});

		nodes.forEach((node, i) => {
			let n = this.getActiveGraphNode(node.id);

			let className = (node.id === this.props.activeNode) ?
				"node highlight active" :
				"node highlight";

			n.setAttribute("class", className);
		})
	}

	resizeGraph(nodes) {
		let activeLeftNode = this.getActiveGraphNode(nodes[0].id);
		let activeRightNode = this.getActiveGraphNode(nodes[nodes.length - 1].id);

		const activeLeft = this.state.left * -1 + activeLeftNode.getBoundingClientRect().left;
		const activeRight = this.state.left * -1 + activeRightNode.getBoundingClientRect().left + activeRightNode.getBoundingClientRect().width;

		let activeWidth = activeRight - activeLeft;
		// let activeCenter = activeLeft + activeWidth/2;
		let ratio = document.body.clientWidth / activeWidth;
		let svg = this.refs.graph.querySelector("svg");

		svg.style.width = svg.getBoundingClientRect().width * ratio;
		svg.style.height = "auto";
	}

	centerOnActiveNodes(nodes) {
		const aidx = nodes.findIndex(n => n.id === this.props.activeNode);
		let node = this.getActiveGraphNode(nodes[aidx].id)
		let nodeBox = node.getBoundingClientRect();
		let activeLeft = this.state.left * -1 + nodeBox.left;

		this.setState({
			left: activeLeft * -1 + (document.body.clientWidth /2 ),
		});
	}

	onWheel(ev) {
		let nextLeft = this.state.left - ev.deltaY;

		this.setState({
			left: (nextLeft < 0) ? nextLeft : 0
		});
	}

	render() {
		return (
			<div
				className={cx({graph: true, alignment: this.props.activeNode ? "normal": "top"})}
				onWheel={this.onWheel.bind(this)}
				ref="graph"
				style={{
					left: this.state.left + "px"
				}}>
				<GraphSvg
					section={this.props.section}
					onSetActiveNode={this.props.onSetActiveNode}
				/>
			</div>
		);
	}
}

Graph.propTypes = {
	section: PropTypes.string,
	activeNode: PropTypes.string,
	onSetActiveNode: PropTypes.func,
	highlightedNodes: PropTypes.array
};

Graph.defaultProps = {};

export default Graph;
