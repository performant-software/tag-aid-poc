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

  async collectSectionData( options, section, outdir, auth ) {
    const sectiondir = `${outdir}/${section.id}`

    if( !fs.existsSync(sectiondir) ) {
      fs.mkdirSync(sectiondir)
    }


    const baseURL = `${options.repository}/tradition/${options.tradition_id}/section/${section.id}`
    this.collectSectionDOT(baseURL,sectiondir,auth)

    // load the annotations
    

    const r = await axios.get(`${baseURL}/readings`, {auth})
    const reading = r.data
    
    //fs.writeFileSync( `${sectiondir}/readings.json`, JSON.stringify(reading) )
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

    // TODO
    //const sectFile = `${outdir}/sections.json`
    //fs.writeFileSync( sectFile, JSON.stringify(sectionlist) )
  }

  loadConfig() {
      const configJSON = fs.readFileSync(`lemma-html-config.json`, "utf8");
      return JSON.parse(configJSON);
  }

 async main() {   
    const config = this.loadConfig()
    this.collectTraditionData(config.options, config.auth)
    console.log('Done!')
  }

}

// RUN 
const lemmaHTML = new LemmaHTML()
lemmaHTML.main().then()