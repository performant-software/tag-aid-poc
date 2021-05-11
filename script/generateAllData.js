const { execSync, spawn } = require('child_process');
const moment = require('moment')
const apiAuth = require('./lemma-html-config.json');

const timestamp = moment().format('YYYY-MM-DD_hh:mm:ss');

spawn('python3', [`script/generate_svgs.py`, `-r https://api.editions.byzantini.st/ChronicleME/stemmarest`, `-u ${apiAuth["auth"]["username"]}`, `-p ${apiAuth["auth"]["password"]}`, `-t ${apiAuth["options"]["tradition_id"]}`, `-v`, `${timestamp}`]);

execSync(`node script/generateDates.js ${timestamp}`);

execSync(`node script/generateManuscriptHtml.js ${timestamp}`);

execSync(`node script/generateStore.js ${timestamp}`);

execSync(`node script/generateLocationData.js ${timestamp}`);

execSync(`node script/generateAllWitnessLunrData.js ${timestamp}`);

execSync(`node script/generateLunrData.js ${timestamp}`);

execSync(`node script/generateTimestampsList.js`);
