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

    // old className={cx({text: true, "top-aligned": this.props.activeNode ? false: true})}

    return (
      <div className="text-pane">
        <div className="reading">
          {textElements}
        </div>
        <div className="translation">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris rhoncus fermentum libero, non sodales ipsum pharetra a. Cras luctus mattis feugiat. Proin arcu magna, euismod eu congue non, luctus et lacus. Nunc sapien quam, viverra sit amet imperdiet et, venenatis vel tortor. In hac habitasse platea dictumst. Sed massa nisi, venenatis sed odio non, commodo facilisis erat. Duis condimentum tempor efficitur. Maecenas rhoncus ex quam, at semper elit imperdiet nec. Sed imperdiet, nisi sed iaculis sollicitudin, magna sapien tincidunt erat, ut scelerisque est augue convallis ante. Fusce consectetur vel arcu sit amet suscipit. Aenean gravida egestas justo, non malesuada mauris facilisis eget. Ut felis libero, laoreet ac venenatis pulvinar, aliquam quis nisi. Morbi fermentum odio ante, non faucibus magna tristique eu. Integer nec pretium mi, sit amet aliquam massa. Etiam lobortis velit nec magna pharetra finibus.
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
