const fs = require('fs')
const axios = require('axios')

class LemmaHTML {

  async collectSectionDOT(baseURL,sectiondir,auth) {
    // TODO
    // # Collect the section dot and SVGify it
    // dotparams = {
    //     'show_normal': 'true',
    //     'normalise': 'spelling'
    // }
    // r = requests.get("%s/dot" % baseurl, params=dotparams, auth=auth)
    // r.raise_for_status()
    // dot = r.text
    // dotresult = subprocess.run(["dot", "-Tsvg"], input=r.text, stdout=subprocess.PIPE, encoding='utf-8')
    // dotresult.check_returncode()
    // with open('%s/graph.svg' % sectiondir, 'w', encoding='utf-8') as svg:
    //     svg.write(dotresult.stdout)
  }

  lemmaToHTML( witReadings, annos ) {
    let textElements = [], annotationElements = []

    // index the annos by beginning reading ID 
    const annoMap = {}
    for( const anno of annos ) {
      let beginID
      for( const link of anno.links ) {
        if( !beginID && link.type === 'BEGIN' ) {
          beginID = link.target
        }
      }
      annoMap[beginID] = anno
    }

    for (const [idx, rdg] of witReadings.entries()) {
      // Get the span text
      const rdgtext = rdg.normal_form ? rdg.normal_form : rdg.text
      // Push on any space that needs to go before the span
      if (idx > 0 && !witReadings[idx-1].join_next && !rdg.join_prior) {
        textElements.push(' ')
      }

      // If an annotation starts here, begin link span and write the annotation
      let currentAnno = annoMap[rdg.id]
      if( currentAnno ) {
        annotationElements.push(`<span>${currentAnno.properties.text}</span>`)
      }

      // Now push on the span for this reading
      textElements.push( `<span id='text-${rdg.id}' key=${rdg.id}>${rdgtext}</span>`)
    }

    const text = `<p>${textElements.join('')}</p>`
    const translation = `<p>${annotationElements.join(' ')}</p>`
    return { text, translation }
  }

  getWitnessReadings(sigil, rdglist) {
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

  async collectSectionData( options, section, outdir, auth ) {
    const sectiondir = `${outdir}/${section.id}`

    if( !fs.existsSync(sectiondir) ) {
      fs.mkdirSync(sectiondir)
    }

    const baseURL = `${options.repository}/tradition/${options.tradition_id}/section/${section.id}`
    this.collectSectionDOT(baseURL,sectiondir,auth)

    const r = await axios.get(`${baseURL}/readings`, {auth})
    const readings = r.data
    const lemmaReadings = this.getWitnessReadings("Lemma text", readings)

    const annoResponse = await axios.get( `${baseURL}/annotations`, {auth, params: {label: 'TRANSLATION'}})
    const annos = annoResponse.data

    const docs = this.lemmaToHTML( lemmaReadings.readings, annos )

    fs.writeFileSync( `${sectiondir}/lemmaText.html`, docs.text )
    fs.writeFileSync( `${sectiondir}/translation.html`, docs.translation )
  }
  
  async collectTraditionData( options, auth ) {
    const baseURL = `${options.repository}/tradition/${options.tradition_id}`

    const response = await axios.get(`${baseURL}/sections`, {auth} ) 
    const responseJSON = response.data
    const outdir = `public/data` 

    const sectionList = []
    for( const sect of responseJSON ) {
      const url = `${baseURL}/section/${sect.id}/lemmatext`      
      const r = await axios.get(url, { auth, params: {'final': 'true'} })
      const answer = r.data

      if( answer.text ) {
        sectionList.push(sect)
        this.collectSectionData( options, sect, outdir, auth )
      }
    }

    const sectFile = `${outdir}/sections.json`
    fs.writeFileSync( sectFile, JSON.stringify(sectionlist) )
  }

  loadConfig() {
      const configJSON = fs.readFileSync(`script/lemma-html/lemma-html-config.json`, "utf8");
      return JSON.parse(configJSON);
  }

 async main() {   
    const config = this.loadConfig()
    await this.collectTraditionData(config.options, config.auth)
    console.log('Done!')
  }

}

// RUN 
const lemmaHTML = new LemmaHTML()
lemmaHTML.main().then()