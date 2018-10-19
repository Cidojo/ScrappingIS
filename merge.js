const TOPIC = "Б7.8"
const FOLDER = `./DBase/${TOPIC}/tickets/`;
const fs = require('fs');

function collectFiles() {
  var files = [];

  fs.readdirSync(FOLDER).forEach(file => {
    files.push(`./DBase/${TOPIC}/tickets/`+file);
  });

  return files;
}


function merge() {
  var mergeResult = [];

  collectFiles();

  for (var i = 0; i < collectFiles().length; i++) {
    var tick = require(`./DBase/${TOPIC}/tickets/ticket__${i+1}.js`);
    var arr = eval("ticket__" + (i+1));

    mergeResult.push(arr);
  }
  return mergeResult;
}


fs.appendFile(`./DBase/${TOPIC}/data.js`, "tickets = " + JSON.stringify(merge(), undefined, 4), function (err) {
  if (err) throw err;
  console.log('Saved!');
});
