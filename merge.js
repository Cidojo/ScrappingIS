const topic = "А1"
const testFolder = `./${topic}/tickets/`;
const fs = require('fs');
var files = [];


var b = fs.readdirSync(testFolder).forEach(file => {
  files.push(`./${topic}/tickets/`+file);
})


function merge() {
  var mergeResult = [];
  for (var i = 0; i < files.length; i++) {
    var tick = require(`./${topic}/tickets/ticket__${i+1}.js`);
    var arr = eval("ticket__" + (i+1));

    mergeResult.push(arr);
  }
  return mergeResult;
}

var mergeResult = merge();

fs.appendFile(`./${topic}/dataBase.js`, "tickets = " + JSON.stringify(mergeResult, undefined, 4), function (err) {
  if (err) throw err;
  console.log('Saved!');
});
