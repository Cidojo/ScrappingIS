const topic = "Б2.13"
const testFolder = `./DBase/${topic}/tickets/`;
const fs = require('fs');
var files = [];


var b = fs.readdirSync(testFolder).forEach(file => {
  files.push(`./DBase/${topic}/tickets/`+file);
})


function merge() {
  var mergeResult = [];
  for (var i = 0; i < files.length; i++) {
    var tick = require(`./DBase/${topic}/tickets/ticket__${i+1}.js`);
    var arr = eval("ticket__" + (i+1));

    mergeResult.push(arr);
  }
  return mergeResult;
}

var mergeResult = merge();

fs.appendFile(`./DBase/${topic}/dataBase.js`, "tickets = " + JSON.stringify(mergeResult, undefined, 4), function (err) {
  if (err) throw err;
  console.log('Saved!');
});
