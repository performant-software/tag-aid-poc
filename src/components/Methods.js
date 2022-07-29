import React, { Fragment } from "react";
import Header from "./Header";

const MethodsPage = (props) => {
    const { onSearch } = props;

    const dejaVuStyle = {
        fontFamily: "Menlo, Consolas, DejaVu Sans Mono monospace",
    };

    return (
        <Fragment>
            <Header onSearch={onSearch} />
            <div className="container content">
                <div className="row">
                    <div className="col-md-auto">
                        <h2>Methods of edition</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-auto">
                        <h4>Digital workflow</h4>
                        <p>
                            This edition of the Chronicle has been conceived and
                            implemented with a fully digital workflow. Our
                            implementation relies on two innovative strands of
                            development. The first is a graph-based
                            computational model for critical editions of texts
                            that survive in multiple manuscript copies; more
                            about this model can be found{" "}
                            <a href="http://dhuniwien.github.io/tradition_repo/">
                                in its documentation
                            </a>
                            . The second strand of development is the use of a
                            "continuous integration" system for management and
                            curation of the textual data, whose stages are
                            described here.
                        </p>
                        <hr />
                        <h5>Manuscript transcription</h5>
                        <p>
                            We have obtained digital images of most of the
                            extant manuscripts; although we do not, generally
                            speaking, have the rights to publish these, we have
                            been able to use them as the basis of our
                            transcriptions.
                        </p>
                        <img
                            className="framed"
                            src="images/tpen_interface.jpg"
                            width="500"
                            alt="T-PEN user interface"
                        />
                        <p>
                            Transcription was done using{" "}
                            <a href="http://t-pen.org/TPEN/">T-PEN</a>, a freely
                            available online tool provided by the Center for
                            Digital Theology at St. Louis University. Each line
                            of text is associated with a region of a manuscript
                            image; selected elements of the{" "}
                            <a href="https://tei-c.org/">
                                Text Encoding Initiative
                            </a>{" "}
                            were used to capture certain features of the text.
                            (For more information on the transcription, see the
                            "Guidelines for transcription" below.){" "}
                        </p>
                        <hr />
                        <h5>The continuous integration pipeline</h5>
                        <img
                            className="framed"
                            src="images/concourse_pipeline.png"
                            width="100%"
                            alt="Continuous integration pipeline"
                        />
                        <h6>
                            <code>tpen-backup</code>
                        </h6>
                        <p>
                            Our pipeline process begins each day with export of
                            the T-PEN data in its native Shared Canvas JSON
                            format.
                        </p>
                        <h6>
                            <code>tpen2tei</code>
                        </h6>
                        <p>
                            The next stage is to convert our transcription files
                            to TEI-XML source files using the{" "}
                            <a href="https://pypi.org/project/tpen2tei/">
                                tpen2tei
                            </a>{" "}
                            Python library, which was developed within the
                            project. The transcriptions as they exist in T-PEN,
                            together with the custom transformations defined for
                            the project for use with tpen2tei, constitute the
                            authoritative source of transcription information.
                        </p>
                        <h6>
                            <code>validate-tei-xml</code>
                        </h6>
                        <p>
                            Wherease the <code>tpen2tei</code> step in the
                            pipeline will detect and alert us to any
                            badly-formed XML output from our transcriptions
                            (e.g. bad syntax or mismatched element tags), it
                            does not validate that XML against any TEI schema.
                            That task is done in the subsequent step. If any
                            transcription file is found to have invalid TEI
                            encoding, the data pipeline will stop at this point
                            until the problem is found and fixed.
                        </p>
                        <h6>
                            <code>collate</code>
                        </h6>
                        <p>
                            Once transcribed, the manuscript texts have been
                            collated with each other, section-by-section, using
                            the software{" "}
                            <a href="https://collatex.net/">CollateX</a>. We
                            also used the collation to assist in the correct
                            expansion of abbreviated words; these abbreviations
                            and expansions are stored in a separate database,
                            which is consulted for later collation runs in order
                            to improve the results.
                        </p>
                        <h6>
                            <code>feed-editions-moe</code>
                        </h6>
                        <p>
                            After segmentation into sections and collation, the
                            results are loaded into the Stemmaweb suite of tools
                            for further processing.
                        </p>
                        <hr />
                        <h5>Editorial work after the pipeline</h5>
                        <p>
                            Automated collation, although very good in most
                            cases, is by no means perfect. Each section, once it
                            reached this point in the process, was imported into
                            the{" "}
                            <a href="https://stemmaweb.net/stemmaweb/">
                                Stemmaweb
                            </a>{" "}
                            suite of tools for further work. The variant graph
                            viewer within Stemmaweb allows corrections to be
                            made to the collation, and allows the association
                            and classification of individual variants.
                        </p>
                        <h5>Stemmatic analysis</h5>
                        <p>Stemmatic analysis TODO</p>
                        <p>Text establishment TODO</p>
                        <p>Annotation and translation TODO</p>
                    </div>
                </div>
                <div className="row divider">
                    <div className="col-md-12">
                        <img src="images/edessa_line.png" alt="" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-auto">
                        <h4>Guidelines for transcription</h4>
                        <h5 id="text-division">Text division</h5>
                        <ul>
                            <li>
                                Divisions are marked where they occur with the{" "}
                                <code style={dejaVuStyle}>&lt;hi&gt;</code> tag.
                            </li>
                            <li>
                                A{" "}
                                <code style={dejaVuStyle}>
                                    &lt;milestone unit="section" n="YEAR"/&gt;
                                </code>{" "}
                                tag has been inserted at the beginning of each
                                year-specific entry, where the
                                <code style={dejaVuStyle}>n</code>
                                attribute contains the number of the Armenian
                                year in question. There are also some intra-year
                                milestones when entries are particularly long
                                and include self-contained sub-sections, such as
                                for the letter of Tzimiskēs, the oration of
                                Barseł <i>vardapet</i>, or the confession of
                                faith of Gagik Bagratuni.
                            </li>
                            <li>
                                Some manuscripts contain their own section
                                markers or numberings; these are represented as
                                notes.
                            </li>
                        </ul>
                        <h5 id="special-characters">Special characters</h5>
                        <ul>
                            <li>
                                Ideograms and ligatures that form a single glyph
                                have been marked as such with a{" "}
                                <code style={dejaVuStyle}>&lt;g&gt;</code> tag
                                containing the characters that the glyph would
                                normalize to.
                            </li>
                            <li>
                                <p>
                                    If an ideogram is followed by seemingly
                                    redundant characters (e.g. [erkir]իր), or if
                                    a ligature appears to stand for a different
                                    set of characters than usual (e.g. the պտ
                                    ligature in place of պետ), it is marked as
                                    follows:
                                </p>
                                <pre className="editor-colors lang-text">
                                    <div className="line">
                                        <span className="syntax--text syntax--plain">
                                            <span className="leading-whitespace">
                                                {" "}
                                            </span>
                                            <span className="syntax--meta syntax--paragraph syntax--text">
                                                &lt;g
                                                ref="երկիր"&gt;երկ&lt;/g&gt;իր
                                            </span>
                                        </span>
                                    </div>
                                </pre>
                            </li>
                            <li>
                                <p>
                                    All glyphs used in the transcription of a
                                    particular manuscript are defined in the TEI
                                    header for that manuscript.
                                </p>
                            </li>
                        </ul>
                        <h5 id="punctuation">Punctuation</h5>
                        <ul>
                            <li>
                                No distinction between '.' and ',' has been
                                attempted in the transcriptions, as these were
                                not distinguishable in the period that most of
                                the manuscripts were written.
                            </li>
                            <li>
                                If a manuscript seems to make substantial use of
                                the Armenian ՝ character, it has been included
                                in the transcription.
                            </li>
                            <li>
                                Other accent marks, whatever their seeming
                                function, are rendered with the Armenian ՛
                                character following the closest vowel to where
                                they occur.
                            </li>
                            <li>
                                Hyphens, when they appear, are rendered with the
                                Armenian ֊ character.
                            </li>
                            <li>
                                Apostrophes before ի are not marked, although
                                they are taken into consideration when the text
                                is transcribed in order to determine whether a
                                word boundary has occurred.
                            </li>
                        </ul>
                        <h5 id="abbreviations">Abbreviations</h5>
                        <ul>
                            <li>
                                Abbreviations are marked with the{" "}
                                <code style={dejaVuStyle}>&lt;abbr&gt;</code>{" "}
                                tag. In general we have not supplied the
                                expansion in the transcription; this is done as
                                part of the collation process.
                            </li>
                            <li>
                                The tag surrounds the letters marked in the
                                abbreviation, rather than the whole word (unless
                                the whole word is marked.) This is in many cases
                                approximate at best.
                            </li>
                            <li>
                                We do not distinguish between different forms of
                                abbreviation (e.g. line above vs. two hatch
                                marks). Likewise, if there are two contiguous
                                abbreviation marks in a word, they can be
                                represented as a single abbreviation.
                            </li>
                        </ul>
                        <h5 id="corrections">Corrections</h5>
                        <ul>
                            <li>
                                If the correction is a replacement, it goes into
                                a{" "}
                                <code style={dejaVuStyle}>
                                    &lt;subst&gt;&lt;del/&gt;&lt;add/&gt;&lt;/subst&gt;
                                </code>{" "}
                                construct.
                            </li>
                            <li>
                                We note the mechanism used to do the correction
                                in the <code style={dejaVuStyle}>rend</code>{" "}
                                attribute, placed on whichever element is
                                appropriate.
                            </li>
                            <li>
                                We note a <code style={dejaVuStyle}>place</code>{" "}
                                for any added text, unless it is in a{" "}
                                <code style={dejaVuStyle}>
                                    &lt;subst rend="overwrite"&gt;
                                </code>
                                .
                            </li>
                            <li>
                                Missing capitals that were evidently meant to be
                                rendered in colored ink are included by means of
                                a{" "}
                                <code style={dejaVuStyle}>
                                    &lt;supplied&gt;
                                </code>{" "}
                                tag.
                            </li>
                        </ul>
                        <h5 id="numbers">Numbers</h5>
                        <ul>
                            <li>
                                Numbers are tagged using a{" "}
                                <code style={dejaVuStyle}>
                                    &lt;num value="XX"&gt;
                                </code>{" "}
                                element, with the numerical value of the number
                                as written.
                            </li>
                            <li>
                                Periods (i.e. Armenian semicolons) around
                                numbers are assumed to be part of the number
                                representation rather than separate punctuation.
                            </li>
                            <li>
                                If the number is marked with a line over it, the
                                line is transcribed with the ՟ character.
                            </li>
                            <li>
                                When a number is split with և, և ի, or similar,
                                it has been wrapped in a single tag (e.g. դ՟ճ՟ և
                                է՟ becomes
                                <code style={dejaVuStyle}>
                                    &lt;num value="407"&gt;դ՟ճ՟ և է՟&lt;/num&gt;
                                </code>
                                .)
                            </li>
                            <li>
                                If the number is declined explicitly, the
                                declination goes outside the number tag{" "}
                                <em>only</em> if it is the last part of the
                                number. e.g.
                                <code style={dejaVuStyle}>
                                    &lt;num value="12"&gt;բ՟ժ՟&lt;/num&gt;աց
                                </code>{" "}
                                but{" "}
                                <code style={dejaVuStyle}>
                                    &lt;num value="12000"&gt;բ՟ժ՟աց
                                    ռ՟&lt;/num&gt;
                                </code>
                                .
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="row divider">
                    <div className="col-md-12">
                        <img src="images/edessa_line.png" alt="" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-auto">
                        <h4>Principles of text establishment</h4>
                        <p>
                            The following principles of original text comparison
                            were applied while preparing the critical edition of
                            the Chronicle of Matthew of Edessa.
                        </p>
                        <ul>
                            <li>
                                The manuscript orthography «աւ» typical of the
                                twelfth century has been preferred to the use of
                                «օ» as used in previous publications (Jerusalem
                                1869, Vagharshapat 1898).
                            </li>
                            <li>
                                Likewise, we have avoided use of the letter «ֆ»
                                as it post-dates the twelfth century. In proper
                                names where the letter «ֆ» appears (M1896,
                                M1767, Ox e.32.), we have used «փ» instead.
                            </li>
                            <li>
                                Conversely, although the glyph «և» was not
                                generally in use by the twelfth century, we have
                                retained it in preference to «եւ» on the grounds
                                that many computer fonts automatically render
                                the latter as the former, and it is therefore
                                unfeasible to proofread for this.
                            </li>
                            <li>
                                Preference has been given to the classical
                                Armenian orthographic form of the word according
                                to the standard reference works (e.g.{" "}
                                <i>Nor Bargirkʿ Haykakan Lezui</i>, the
                                Armenian-English dictionary of Bedrossian). e.g.
                                կաթուղիկոս instead of կաթողիկոս, թուականութիւն
                                instead of թվականութիւն.
                            </li>
                            <li>
                                Proper names are rendered in lower-case letters
                                in the vast majority of manuscripts (with the
                                exception of the manuscript Bz644). This has
                                been retained for the critical text.
                            </li>
                            <li>
                                Numbers have been rendered with Armenian
                                numerals in a normalised form, e.g. Ն rather
                                than ԴՃ for 400, if they are rendered in the
                                manuscripts as such. Where the manuscripts agree
                                that the number was written out (e.g. չորս
                                հարիւր), this has been retained. The
                                abbreviation of numbers and dates with letters
                                mainly appears after the «Bolorgir» became the
                                dominant form of writing from the 13th century.
                                Before that, during the «Yerkatagir» period,
                                numbers and dates were mainly written out in
                                words.
                            </li>
                            <li>
                                The intent of the punctuation system is to
                                convey the meaning of the sentence to readers;
                                in this sense, punctuation has been treated more
                                like markup than like reconstructed text. The
                                semicolon (".") and the full stop ("։") have
                                been retained in the edition according to
                                manuscript consensus; quotation marks and
                                question marks have been added where
                                appropriate, although these do not usually
                                appear in the manuscripts.
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="row footer">
                    <div className="col-md-auto">
                        <img
                            src="images/by-sa.png"
                            width="100"
                            alt="CC-BY-SA"
                        />
                    </div>
                    <div className="col-md-auto">
                        <p>Created with the generous support of:</p>
                    </div>
                    <div className="col-md-auto">
                        <img
                            src="images/SNF_RGB_E_POS.png"
                            alt="FNSNF logo"
                            height="50px"
                        />
                        <img
                            src="images/univie_logo.jpg"
                            alt="Universität Wien logo"
                            height="50px"
                        />
                    </div>
                </div>
            </div>
        </Fragment>
    );
};
export default MethodsPage;
