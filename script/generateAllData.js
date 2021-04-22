const { execSync, spawn } = require('child_process');
const moment = require('moment')
const apiAuth = require('./lemma-html-config.json');

const timestamp = moment().format('YYYY-MM-DD_hh:mm:ss');

console.log("Generating SVGs..."');
spawn('python3', [`script/generate_svgs.py`, `-r https://api.editions.byzantini.st/ChronicleME/stemmarest`, `-u ${apiAuth["auth"]["username"]}`, `-p ${apiAuth["auth"]["password"]}`, `-t ${apiAuth["options"]["tradition_id"]}`, `-v`, `${timestamp}`]);
console.log("Done generating SVGs"');

console.log("Generating dates..."');
execSync(`node script/generateDates.js ${timestamp}`);
console.log("Done generating dates"');

console.log("Generating manuscript HTML..."');
execSync(`node script/generateManuscriptHtml.js ${timestamp}`);
console.log("Done generating manuscript HTML"');

console.log("Generating store..."');
execSync(`node script/generateStore.js ${timestamp}`);
console.log("Done generating store"');

console.log("Generating location data..."');
execSync(`node script/generateLocationData.js ${timestamp}`);
console.log("Done generating location data"');

console.log("Generating witness Lunr data..."');
execSync(`node script/generateAllWitnessLunrData.js ${timestamp}`);
console.log("Done generating witness Lunr data"');

console.log("Generating Lunr data..."');
execSync(`node script/generateLunrData.js ${timestamp}`);
console.log("Done generating witness Lunr data"');

console.log("Generating timestamp list..."');
execSync(`node script/generateTimestampsList.js`);
console.log("Done generating timestamp list"');

console.log("Done generating all data!"');
