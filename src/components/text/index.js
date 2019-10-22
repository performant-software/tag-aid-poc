import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import Parser from 'html-react-parser';
import domToReact from 'html-react-parser/lib/dom-to-react';

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
    // const text = "<p><span id='text-1104328' key=1104328>Եւ</span> <span id='text-1104327' key=1104327>ի</span> <span id='text-1104309' key=1104309>լինել</span> <span id='text-1104311' key=1104311>թուականութեանս</span> <span id='text-1104306' key=1104306>հայոց</span> <span id='text-1104301' key=1104301>ՆԼԴ</span> <span id='text-1104317' key=1104317>ամին</span> <span id='text-1104297' key=1104297>մեռանէր</span> <span id='text-1104288' key=1104288>հայոց</span> <span id='text-1104295' key=1104295>հայրապետն</span> <span id='text-1104280' key=1104280>տէր</span> <span id='text-1104285' key=1104285>ստեփանոս</span><span id='text-1104281' key=1104281>.</span> <span id='text-1104276' key=1104276>և</span> <span id='text-1104264' key=1104264>ձեռնադրեաց</span> <span id='text-1104269' key=1104269>յաթոռ</span> <span id='text-1104260' key=1104260>իւր</span> <span id='text-1104258' key=1104258>զերանելին</span> <span id='text-1104262' key=1104262>զտէր</span> <span id='text-1104255' key=1104255>խաչիկ</span><span id='text-1104254' key=1104254>.</span> <span id='text-1104249' key=1104249>վասն</span> <span id='text-1104245' key=1104245>զի</span> <span id='text-1104244' key=1104244>էր</span> <span id='text-1104238' key=1104238>այր</span> <span id='text-1104243' key=1104243>փառաւոր</span><span id='text-1104242' key=1104242>.</span> <span id='text-1104233' key=1104233>և</span> <span id='text-1104228' key=1104228>տեղեակ</span> <span id='text-1104224' key=1104224>աստուածային</span> <span id='text-1104230' key=1104230>կտակարանացն</span><span id='text-1104236' key=1104236>.</span> <span id='text-1104217' key=1104217>արդ</span> <span id='text-1104216' key=1104216>առ</span> <span id='text-1104214' key=1104214>սա</span> <span id='text-1104212' key=1104212>եկեալ</span> <span id='text-1104210' key=1104210>թուղթ</span> <span id='text-1104207' key=1104207>ի</span> <span id='text-1104203' key=1104203>հոռոմոց</span> <span id='text-1104204' key=1104204>պատրիարգէն</span> <span id='text-1104191' key=1104191>ի</span> <span id='text-1104194' key=1104194>թէոդորոսէ</span> <span id='text-1104180' key=1104180>որ</span> <span id='text-1104175' key=1104175>նստէր</span> <span id='text-1104173' key=1104173>ի</span> <span id='text-1104170' key=1104170>մայրաքաղաքն</span> <span id='text-1104166' key=1104166>մելտենի</span><span id='text-1104353' key=1104353>.</span> <span id='text-1104164' key=1104164>վասն</span> <span id='text-1104163' key=1104163>զի</span> <span id='text-1104162' key=1104162>էր</span> <span id='text-1104357' key=1104357>այր</span> <span id='text-1104160' key=1104160>կորովի</span> <span id='text-1104158' key=1104158>և</span> <span id='text-1104119' key=1104119>հմուտ</span> <span id='text-1104118' key=1104118>գրոց</span> <span id='text-1104116' key=1104116>պատուիրանաց</span><span id='text-1104115' key=1104115>.</span> <span id='text-1104113' key=1104113>և</span> <span id='text-1104135' key=1104135>վարդապետն</span> <span id='text-1104137' key=1104137>հայոց</span> <span id='text-1104140' key=1104140>սամուէլ</span> <span id='text-1104107' key=1104107>գրեաց</span> <span id='text-1104151' key=1104151>ընդդէմ</span> <span id='text-1104152' key=1104152>նորա</span> <span id='text-1104099' key=1104099>զպատասխանիսն</span> <span id='text-1104097' key=1104097>վայելուչ</span> <span id='text-1104081' key=1104081>և</span> <span id='text-1104085' key=1104085>ցանկալի</span> <span id='text-1104083' key=1104083>բանիւք</span><span id='text-1104086' key=1104086>.</span> <span id='text-1104076' key=1104076>որ</span> <span id='text-1104075' key=1104075>եղև</span> <span id='text-1104074' key=1104074>իսկ</span> <span id='text-1104358' key=1104358>հաճելի</span> <span id='text-1104361' key=1104361>թուղթն</span> <span id='text-1104071' key=1104071>այն</span> <span id='text-1104070' key=1104070>ամենայն</span> <span id='text-1104068' key=1104068>լսողացն</span><span id='text-1104368' key=1104368>.</span> <span id='text-1104064' key=1104064>ևս</span> <span id='text-1104061' key=1104061>առաւել</span> <span id='text-1104056' key=1104056>մեծարեալ</span> <span id='text-1104054' key=1104054>եղև</span> <span id='text-1104035' key=1104035>առաջի</span> <span id='text-1104029' key=1104029>թէոդորոսի</span> <span id='text-1104028' key=1104028>պատրիարգին</span><span id='text-1104027' key=1104027>.</span> <span id='text-1104033' key=1104033>և</span> <span id='text-1104024' key=1104024>եղև</span> <span id='text-1104023' key=1104023>մեծ</span> <span id='text-1104021' key=1104021>բարեկամութիւն</span> <span id='text-1104020' key=1104020>ընդ</span> <span id='text-1104037' key=1104037>թէոդորոսի</span> <span id='text-1104014' key=1104014>պատրիարգին</span> <span id='text-1104040' key=1104040>հոռոմոց</span> <span id='text-1104012' key=1104012>և</span> <span id='text-1087902' key=1087902>ընդ</span> <span id='text-1104371' key=1104371>տէր</span> <span id='text-1003442' key=1003442>խաչիկ</span> <span id='text-1104011' key=1104011>կաթողիկոսի</span> <span id='text-1102105' key=1102105>հայոց</span><span id='text-1102103' key=1102103>։</span></p>"
    // const translation = '<p><span>Now in those days and in the year 401 there was a severe famine in many places.</span> <span>But in the southern land, in the country of the Muslims, there was great affliction, and most of all in Mesopotamia.</span> <span>And from the harshness of the famine anxiety and trembling arose in many places,</span> <span>and in the renowned mother city of Edessa,</span> <span>which was founded by Tigran the Armenian king.</span> <span>And the famine endured in that country for 5 years and there was immense carnage on account of that famine,</span> <span>and there was great passage in the land of the Muslims.</span> <span>and innumerable Christians died on account of the severity of the famine.</span> <span>And after 5 years locusts arose in that district, like sands of the sea, and ruined the earth.</span> <span>The famine intensified more and more,</span> <span>and many, growing enraged, savagely and mercilessly fell upon and ate each other.</span> <span>The princes and nobility were feeding themselves with grains and berries and there was a great passage of animals.</span> <span>Many villages and districts became depopulated,</span> <span>and nothing else was built up to the time of today.</span></p>'
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

  // Render the text
  renderOld() {
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
