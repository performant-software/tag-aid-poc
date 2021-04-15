const { spawn, execSync } = require('child_process');
const moment = require('moment')
const apiAuth = require('./lemma-html-config.json');
const dates = require('./generateDates.js');
const manuscripts = require('./generateManuscriptHtml.js');
const store = require('./generateStore.js');
const locationData = require('./generateLocationData.js');
const witnessLunrData = require('./generateAllWitnessLunrData.js');
const lunrData = require('./generateLunrData.js');
const timestampsList = require('./generateTimestampsList.js');

const timestamp = moment().format('YYYY-MM-DD_hh:mm:ss');

const gatherSvgs = () => {
    const logOutput = (name) => (data) => console.log(`[${name}] ${data.toString()}`)

    const run = () => {
      const process = spawn('python3', [`script/generate_svgs.py`, `-r https://api.editions.byzantini.st/ChronicleME/stemmarest`, `-u ${apiAuth["auth"]["username"]}`, `-p ${apiAuth["auth"]["password"]}`, `-t ${apiAuth["options"]["tradition_id"]}`, `-v`, `${timestamp}`]);

      process.stdout.on('data', logOutput('stdout'));
      process.stderr.on('data', logOutput('stderr'));
    }

    (() => {
    try {
      Promise.resolve(run());
      // process.exit(0)
    } catch (e) {
      console.error(e.stack);
      process.exit(1);
    }
  })();
};

const runAllScripts = async () => {

    console.log("Preparing to gather SVGs...")
    await gatherSvgs()
    console.log("Done generating SVGs")
    console.log("Preparing to generate dates...");
    await dates.generateDates(timestamp);
    console.log("Done generating dates")
    console.log("Preparing to generate manuscript HTML...")
    await manuscripts.process(timestamp);
    console.log("Done generating manuscript HTML")
    console.log("Preparing to generate store...")
    await store.generateStore(timestamp);
    console.log("Done generating store")
    console.log("Preparing to generate location data...")
    await locationData.GenerateLocationData(timestamp);
    console.log("Done generating location data")
    console.log("Preparing to generate witness Lunr source...")
    await witnessLunrData.generateLunrSource(timestamp);
    console.log("Done generating witness Lunr source")
    console.log("Preparing to generate Lunr source...")
    await lunrData.generateLunrSource(timestamp);
    console.log("Done generating Lunr source")
    console.log("Preparing to generate list of timestamps...")
    await timestampsList.generateTimestampsList();
    console.log("Done generating list of timestamps")
};

runAllScripts();
