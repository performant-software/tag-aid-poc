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

  lemmaToHTML( titles, witReadings, annos ) {
    let textElements = [], annotationElements = []

    let enTitle = "", hyTitle = ""
    for( const title of titles ) {
      const {properties} = title 
      if( properties.language === 'en') {
        enTitle = properties.text
      } 
      if( properties.language === 'hy' ) {
        hyTitle = properties.text
      }
    }

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

    const text = `<div><h3>${hyTitle}</h3><p>${textElements.join('')}</p></div>`
    const translation = `<div><h3>${enTitle}</h3><p>${annotationElements.join(' ')}</p></div>`
    return { title: enTitle, text, translation }
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
  
  async collectSectionData( options, section, auth ) {
    const baseURL = `${options.repository}/tradition/${options.tradition_id}/section/${section.id}`

    const r = await axios.get(`${baseURL}/readings`, {auth})
    const readings = r.data
    const lemmaReadings = this.getWitnessReadings("Lemma text", readings)

    const titleResponse = await axios.get( `${baseURL}/annotations`, {auth, params: {label: 'TITLE'}})
    const titles = titleResponse.data

    const translationResponse = await axios.get( `${baseURL}/annotations`, {auth, params: {label: 'TRANSLATION'}})
    const translations = translationResponse.data

    return this.lemmaToHTML( titles, lemmaReadings.readings, translations )
  }
  
  async collectTraditionData( options, auth ) {
    const outdir = "public/data"
    const baseURL = `${options.repository}/tradition/${options.tradition_id}`

    const response = await axios.get(`${baseURL}/sections`, {auth} ) 
    const responseJSON = response.data

    const sectionList = []
    for( const sect of responseJSON ) {
      const url = `${baseURL}/section/${sect.id}/lemmatext`      
      const r = await axios.get(url, { auth, params: {'final': 'true'} })
      const answer = r.data

      const sectiondir = `${outdir}/${sect.id}`

      if( !fs.existsSync(sectiondir) ) {
        fs.mkdirSync(sectiondir)
      }

      this.collectSectionDOT(baseURL,sectiondir,auth)

      const lemmaFile = `${sectiondir}/lemmaText.html`
      const translationFile = `${sectiondir}/translation.html`

      if( answer.text ) {
        const sectionData = await this.collectSectionData( options, sect, auth )
        sect.displayName = sectionData.title
        sectionList.push(sect)

        if( sectionData.text && sectionData.text.length > 0 ) {
          fs.writeFileSync( lemmaFile, sectionData.text )    
        }
    
        if( sectionData.translation && sectionData.translation.length > 0) {
          fs.writeFileSync( translationFile, sectionData.translation )  
        }    
      } else {
        if( fs.existsSync(lemmaFile)) fs.unlinkSync(lemmaFile);
        if( fs.existsSync(translationFile)) fs.unlinkSync(translationFile);
      }
    }

    const sectFile = `${outdir}/sections.json`
    fs.writeFileSync( sectFile, JSON.stringify(sectionList) )
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