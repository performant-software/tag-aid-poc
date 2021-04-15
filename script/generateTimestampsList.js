const fs = require('fs')

async function generateTimestampsList() {
  const outdir = `public/data`;
  const list = [];
  const rawList = fs.readdirSync(outdir);

  rawList.forEach((dir) => {
    if (dir.split("_")[0] == "data") {
      list.push({
        label: checkForMultiples(dir, rawList) ? `${dir.split("_")[1]} (${dir.split("_")[2]}) ` : dir.split("_")[1],
        value: dir
      })
    }
  });

  const sortedList = list.sort((a, b) => {
    return b.label.localeCompare(a.label)
  });

  fs.writeFileSync(`${outdir}/timestampsList.json`, JSON.stringify(sortedList));
};

const checkForMultiples = (item, arr) => {
  return arr.filter((el) => el.split("_")[1] == item.split("_")[1]).length > 1
};

generateTimestampsList();

exports.generateTimestampsList = generateTimestampsList;
