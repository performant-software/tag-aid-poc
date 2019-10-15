import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";


class TextPane extends React.Component {

  // Handle scrolling to the active node
  componentDidUpdate() {
    if(this.props.activeNode == null) { return; }
    const textNode = document.querySelector("#text-" + this.props.activeNode);
    if(textNode == null) { return; }
    const textBox = document.querySelector(".reading");
    const nodeTop = textNode.getBoundingClientRect().top;
    const textBoxTop = textBox.getBoundingClientRect().top;
    textBox.scrollTop = nodeTop - textBoxTop;
  }

  renderWitnessList() {

    let witness = this.props.activeWitness ? this.props.activeWitness.sigil : '';
		let witnessList = this.props.text.witnesses.slice();
		if (witnessList.length) {
			witnessList.unshift('Lemma text');
		}

    return (
      <ul>
          {witnessList.map((w) => (
            <li className={w === witness ? "selected" : ""}
              key={w}
              onClick={() => this.props.onSetActiveWitness(w)}>
              {w}
            </li>
          ))}
      </ul>
    );
  }

  // Render the text
  render() {
    let textElements = [];
		let witReadings = this.props.activeWitness ? this.props.activeWitness.readings : [];
    for (const [idx, rdg] of witReadings.entries()) {
      // Get the span text
      const rdgtext = rdg.normal_form ? rdg.normal_form : rdg.text;
      // Push on any space that needs to go before the span
      if (idx > 0 && !witReadings[idx-1].join_next && !rdg.join_prior) {
        textElements.push(' ');
      }
      // Now push on the span for this reading
      textElements.push(
        <span
          className={cx({
            active: this.props.activeNode === rdg.id,
            visible: this.props.highlightedNodes.find(
							(n) => n.id === rdg.id) != null
          })}
          id={`text-${rdg.id}`}
          key={rdg.id}
          // onClick={() => this.props.onSetActiveNode(rdg.id) }>
          >
          {rdgtext}
        </span>
      );
    }

    return (
      <div className={cx({text: true, "top-aligned": this.props.activeNode ? false: true})}>
        <div className="reading">
          {textElements}
        </div>
      </div>
    );

    
  }
}

TextPane.propTypes = {
	text: PropTypes.object,
  activeNode: PropTypes.string,
  activeWitness: PropTypes.object,
  onSetActiveNode: PropTypes.func,
	onSetActiveWitness: PropTypes.func,
	highlightedNodes: PropTypes.array
};

export default TextPane;
