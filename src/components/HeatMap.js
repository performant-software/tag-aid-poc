import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

class HeatMap extends React.Component {
	onRankClick(rankIdx) {
		for(let rank = rankIdx; rank > 0; rank--) {
			let found = this.props.activeWitness.readings.filter((reading) => reading.rank === rank);
			if(found.length) { return this.props.onSetActiveNode(found[0].id); }
		}
	}

	render() {
		let grouped = [],
			highlightedRanks = this.props.highlightedNodes.map((n) => n.rank);

		for (let idx in this.props.text.readings) {
			let rank = this.props.text.readings[idx].rank;
			grouped[rank] = (grouped[rank] || 0) + 1;
		}

		let hl1 = highlightedRanks.length ?
			<polygon className="highlighted" points={
				`${500 / grouped.length * highlightedRanks[0] - 3},18.5 ` +
				`${500 / grouped.length * highlightedRanks[0]},16 ` +
				`${500 / grouped.length * highlightedRanks[0]},21`} />
			: null;

		let hl2 = highlightedRanks.length ?
			<polygon className="highlighted" points={
				`${500 / grouped.length * highlightedRanks[highlightedRanks.length - 1] + 3},18.5 ` +
				`${500 / grouped.length * highlightedRanks[highlightedRanks.length - 1]},16 ` +
				`${500 / grouped.length * highlightedRanks[highlightedRanks.length - 1]},21`} />
			: null;

		return (
			<div className={cx({heatmap: true, "top-aligned": this.props.activeNode ? false: true})}>
				<svg style={{width: "100%"}} viewBox="0 0 500 21">
					{grouped.map((realAmt, rank) => {
						let amt = realAmt === 1 ? 1 : realAmt * 3;
						return (<polygon className={cx({highlighted: highlightedRanks.indexOf(rank) > -1})}
							key={rank}
							onClick={this.onRankClick.bind(this, rank)}
							points={`${500 / grouped.length * rank},16 ` +
							`${(500 / grouped.length * rank) + (500 / grouped.length)},16 ` +
							`${(500 / grouped.length * rank) + ((500 / grouped.length) / 2)},${16 - (amt)}`} />);
					})}
					{hl1}
					{hl2}
				</svg>
			</div>
		);
	}
}

HeatMap.propTypes = {
	text: PropTypes.object,
  activeNode: PropTypes.string,
  activeWitness: PropTypes.object,
  onSetActiveNode: PropTypes.func,
	highlightedNodes: PropTypes.array
};

export default HeatMap;
