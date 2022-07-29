import React, { Fragment } from "react";
import Header from "./Header";

const AboutPage = (props) => {
    const { onSearch } = props;

    return (
        <Fragment>
            <Header onSearch={onSearch} />
            <div className="container content">
                <div className="row">
                    <div className="col-md-auto">
                        <h2>
                            About the <i>Chronicle</i>
                        </h2>
                        <p>
                            The <i>Chronicle</i> of Matthew of Edessa was
                            written in the first half of the twelfth century,
                            probably in stages between the years 1102 and 1131.
                            Matthew was an Armenian priest resident in, and
                            probably native to, Edessa; he wrote in the
                            vernacular version of the language with which he was
                            familiar. His history covers the history of the
                            Armenian principalities as well as Byzantium and the
                            emirates of the Near East between the years 952 and
                            1129. The text was extended by an author himself
                            only as ‘the humble priest Grigor’, a resident of
                            the nearby town of Kesun, to cover the year 1136 to
                            1162.
                        </p>
                        <p>
                            The <i>Chronicle</i> survives in at least 35 more or
                            less complete manuscripts held in libraries
                            throughout Europe and the Near East. Although the
                            text was known to have been read by others within a
                            century of its completion—Smbat, the brother of king
                            Hetʿum of Cilicia in the thirteenth century, relied
                            almost entirely upon Matthew’s text for the relevant
                            portion of his own history—the surviving manuscripts
                            all date from 1590 or later, and the two oldest
                            manuscripts represent two distinct recensions.
                            Roughly half of the manuscripts can be dated to the
                            seventeenth century. This was the period of a great
                            ‘rescue’ of Armenian literature—a concerted effort
                            to copy and preserve the texts that had survived the
                            ravages of war and invasion between the fourteenth
                            and sixteenth centuries.{" "}
                        </p>
                        <p>
                            The first publication of the <i>Chronicle</i> was
                            the French translation published by Edouard
                            Dulaurier in 1858, which was made from a manuscript
                            prepared by the Mekhitarist Fathers of Venice, on
                            the basis of the four copies held in that library.
                            This includes the oldest extant copy of the text.
                            The <em>editio princeps</em> was published in
                            Jerusalem in 1869, on the basis of two manuscripts
                            held in the library there and with reference to the
                            translation of Dulaurier; this was superseded by the
                            edition published in 1898 in Vałaršapat, Armenia.
                        </p>
                        <p>
                            The Vałaršapat edition took as its base a manuscript
                            copied in 1689 at Amrdolu monastery in Bitlis, under
                            the patronage of Vardan Bałišecʿi. This was regarded
                            by the editors as the best surviving text, due
                            partially to the claims of its provenance made in
                            the colophon and partially to the presence of two
                            passages of text that are missing in all other
                            versions. The editors also noted selected variants
                            from five other manuscripts now held at the
                            Matenadaran, as well as from the{" "}
                            <em>editio princeps</em>. All six of these
                            manuscripts are included in the present edition.
                        </p>
                    </div>
                </div>

                <div className="row divider">
                    <div className="col-md-12">
                        <img src="images/edessa_line.png" alt="" />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-auto">
                        <h2>About the project</h2>
                        <p>
                            This edition has its beginnings in the D.Phil.
                            thesis of Tara L. Andrews, completed at the
                            University of Oxford in 2009. The groundwork for the
                            present edition has been laid thanks to the generous
                            support of the Swiss National Science Foundation,
                            through the project{" "}
                            <a href="http://p3.snf.ch/project-159433">
                                The Chronicle of Matthew of Edessa Online
                            </a>
                            , which ran from 2015 to 2019.
                        </p>
                        <h4>Project team</h4>
                        <div className="row team-member">
                            <div className="col-md-3">
                                <img
                                    src="images/andrews.jpg"
                                    width="100"
                                    alt="Tara L. Andrews"
                                />
                            </div>
                            <div className="col-md-9">
                                <p>
                                    <strong>Tara L. Andrews</strong> has been
                                    Professor for Digital Humanities at the
                                    University of Vienna since 2016. She did her
                                    B.Sc. in Humanities and Engineering at MIT
                                    (1995–1999), followed by an M.Phil.
                                    (2003–2005) and D.Phil. (2006–2009) at the
                                    University of Oxford. She began to study
                                    aspects of the <i>Chronicle</i> while
                                    preparing her M.Phil. thesis; this together
                                    with her doctoral work resulted in a 2016
                                    monograph published by Brill. Tara's
                                    research interests include the history and
                                    historiography of the Christian Near East in
                                    the tenth to twelfth centuries, the
                                    application of computational and statistical
                                    methods for reconstruction of the copying
                                    history of ancient and medieval manuscripts
                                    (stemmatology), and reflection on the
                                    implications of employing digital media and
                                    computational methods in humanities
                                    contexts, all of which have figured in
                                    production of the present edition.
                                </p>
                            </div>
                        </div>
                        <div className="row team-member">
                            <div className="col-md-3">
                                <img
                                    src="images/safaryan.jpg"
                                    height="100"
                                    alt="Anahit Safaryan"
                                />
                            </div>
                            <div className="col-md-9">
                                <p>
                                    <strong>Anahit Safaryan</strong> did her BA
                                    in History (2009-2013) and MA in History
                                    (2013-2015) at Yerevan State University. She
                                    started her doctoral studies at the
                                    University of Bern (2015-2017), where she
                                    was also employed to work on the SNSF
                                    project. In 2017, together with the project
                                    itself, Anahit moved to the University of
                                    Vienna to continue her doctoral research,
                                    which focuses on the topic of the reception
                                    of the <i>Chronicle</i> in the 17th and 18th
                                    centuries.
                                </p>
                            </div>
                        </div>
                        <div className="row team-member">
                            <div className="col-md-3">
                                <img
                                    src="images/atayan.jpg"
                                    height="100"
                                    alt="Tatev Atayan"
                                />
                            </div>
                            <div className="col-md-9">
                                <p>
                                    <strong>Tatev Atayan</strong> did her BA in
                                    History (2003-2007), MA in History
                                    (2007-2009) and PhD in Source study and
                                    Historiography (2011-2016) at Yerevan State
                                    University. She was employed by the same
                                    University as a coordinator of E-materials
                                    on the Faculty of History (2013-2017) and as
                                    a lecturer of Department of History of
                                    Armenia (2016-2017). Tatev joined the
                                    project in 2017 as a post-doctoral
                                    researcher.
                                </p>
                            </div>
                        </div>
                        <div className="row team-member">
                            <div className="col-md-3">
                                <img
                                    src="images/kaufmann.png"
                                    width="100"
                                    alt="Sascha Kaufmann"
                                />
                            </div>
                            <div className="col-md-9">
                                <p>
                                    <strong>Sascha Kaufmann</strong> was
                                    employed as a post-doctoral researcher on
                                    the SNSF project from 2015–2016. He
                                    contributed primarily to the development of
                                    Stemmarest, the repository for critical
                                    editions developed within the project.
                                </p>
                            </div>
                        </div>
                        <p>&nbsp;</p>
                        <h4>Other contributors</h4>
                        <h5>Software development</h5>
                        <div className="row team-member">
                            <div className="col-md-3">
                                <img
                                    src="images/aliabadi.jpg"
                                    width="100"
                                    alt="Schiwa Aliabadi-Pongratz"
                                />
                            </div>
                            <div className="col-md-9">
                                <p>
                                    <strong>Schiwa Aliabadi-Pongratz</strong>{" "}
                                    has been employed as an application
                                    developer at the University of Vienna since
                                    2018. She has several years of working
                                    experience in the field of electronic
                                    publishing in the private sector and found
                                    her way to Digital Humanities via her recent
                                    coursework in South Asian and Buddhist
                                    Studies. She is responsible for several
                                    tools and applications that were used in the
                                    preparation of the critical edition.
                                </p>
                            </div>
                        </div>
                        <div className="row team-member">
                            <div className="col-md-3">
                                <img
                                    src="images/anonymous.jpg"
                                    height="100"
                                    alt="Jean Bauer"
                                />
                            </div>
                            <div className="col-md-9">
                                <p>
                                    <strong>Jean Bauer</strong> was responsible
                                    for consultancy and design of the online
                                    publication of the <i>Chronicle</i>. More
                                    information on the services she provides can
                                    be found here:{" "}
                                    <a href="http://jeanbauer.com/">
                                        jeanbauer.com
                                    </a>
                                    .
                                </p>
                            </div>
                        </div>
                        <div className="row team-member">
                            <div className="col-md-3">
                                <img
                                    src="images/anonymous.jpg"
                                    height="100"
                                    alt="Christian Veigl"
                                />
                            </div>
                            <div className="col-md-9">
                                <p>
                                    <strong>Christian "oftl" Veigl</strong> was
                                    employed as an application developer at the
                                    University of Vienna from 2016–2018. He was
                                    primarily responsible for the continuous
                                    integration system through which the edition
                                    project was developed and managed.
                                </p>
                            </div>
                        </div>
                        <h5>Manuscript transcription</h5>
                        <div className="row team-member">
                            <div className="col-md-3">
                                <img
                                    src="images/anonymous.jpg"
                                    width="100"
                                    alt="Razmik Ghazaryan"
                                />
                            </div>
                            <div className="col-md-9">
                                <p>
                                    <strong>Razmik Ghazaryan</strong> completed
                                    his BA at Yerevan State University in 2014.
                                </p>
                            </div>
                        </div>
                        <div className="row team-member">
                            <div className="col-md-3">
                                <img
                                    src="images/anonymous.jpg"
                                    height="100"
                                    alt="Anahit Poghosyan"
                                />
                            </div>
                            <div className="col-md-9">
                                <p>
                                    <strong>Anahit Poghosyan</strong> completed
                                    her MA at Yerevan State University in 2015.
                                </p>
                            </div>
                        </div>
                        <div className="row team-member">
                            <div className="col-md-3">
                                <img
                                    src="images/anonymous.jpg"
                                    height="100"
                                    alt="Tatevik Vardanyan"
                                />
                            </div>
                            <div className="col-md-9">
                                <p>
                                    <strong>Tatevik Vardanyan</strong> completed
                                    her MA at Yerevan State University in 2015.
                                </p>
                            </div>
                        </div>
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
export default AboutPage;
