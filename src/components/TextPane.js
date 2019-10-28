import React from "react";
import PropTypes from "prop-types";
// import cx from "classnames";
import Parser from 'html-react-parser';
// import domToReact from 'html-react-parser/lib/dom-to-react';

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

	htmlToReactParserOptions() {
		var parserOptions =  {
			 replace: function(domNode) {
       
				 switch (domNode.name) {
        
          // TODO make text interactive w/viz
          // <span
        //   className={cx({
        //     active: this.props.activeNode === rdg.id,
        //     visible: this.props.highlightedNodes.find(
				// 			(n) => n.id === rdg.id) != null
        //   })}
          // onClick={() => this.props.onSetActiveNode(rdg.id) }>

						default:
							/* Otherwise, Just pass through */
							return domNode;
				 }
			 }
		 };
		 return parserOptions;
	}

  // renderWitnessList() {

  //   let witness = this.props.activeWitness ? this.props.activeWitness.sigil : '';
	// 	let witnessList = this.props.text.witnesses.slice();
	// 	if (witnessList.length) {
	// 		witnessList.unshift('Lemma text');
	// 	}

  //   return (
  //     <ul>
  //         {witnessList.map((w) => (
  //           <li className={w === witness ? "selected" : ""}
  //             key={w}
  //             onClick={() => this.props.onSetActiveWitness(w)}>
  //             {w}
  //           </li>
  //         ))}
  //     </ul>
  //   );
  // }

  render() {
    const text = this.props.text.lemmaText
    const translation = this.props.text.translation
    const htmlToReactParserOptions = this.htmlToReactParserOptions()

    return (
      <div className="text-pane">
        <div className="reading">
          { text ? Parser(text,htmlToReactParserOptions) : null }
        </div>
        <div className="translation">
          { translation ? Parser(translation,htmlToReactParserOptions): null}
        </div>
      </div>
    )
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
