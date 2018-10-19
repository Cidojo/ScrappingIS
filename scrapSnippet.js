var questCollection = [];
var answerCollection;
var ticketNumString = document.querySelector("h5").textContent;
var numberto = ticketNumString.substring(ticketNumString.indexOf('№')+1, );
var ticketNum = "ticket__" + ticketNumString.substring(ticketNumString.indexOf('№')+1, );


function createQuest(num, quest, varyArray, currNum) {

  this.num = num;
  this.quest = quest;
  this.vary = varyArray;
  if (currNum) {
    this.correct = currNum;
  }
};

var selectQuestion = document.querySelectorAll('h5 ~ div div > i');

for (var i = 0; i < selectQuestion.length; i++) {
  var currNum = 0;

  selectQuestion[i].removeChild(selectQuestion[i].children[0]);
  var selectAnswers = selectQuestion[i].parentElement.querySelectorAll('span');

  myString = selectQuestion[i].textContent.trim();
  var trimmed = myString.substring(myString.indexOf(')')+1);
  answerCollection = [];

  for (var j = 0; j < selectAnswers.length; j++) {

    var answerX = selectAnswers[j].textContent;
    answerCollection.push(answerX);
    if (selectAnswers[j].getAttribute("style") === "color:#4db83e") {
      currNum = j+1;
      // console.log(trimmed);
      // console.log("Вопрос " + (i+1) + ":" + trimmed + "\nПравильный ответ: " + selectAnswers[j].textContent)
    }
  }

  var newQuest = new createQuest(i+1, trimmed, answerCollection, currNum);
//   console.log("creating new question query...\n" + newQuest.vary[newQuest.correct]);
  questCollection.push(newQuest);
}

(function(console){

console.save = function(data, filename){

    if(!data) {
        console.error('Console.save: No data')
        return;
    }

    if(!filename) filename = 'console.json'

    if(typeof data === "object"){
        data = ticketNum + " = " + JSON.stringify(data, undefined, 4)
    }

    var blob = new Blob([data], {type: 'text/js'}),
        e    = document.createEvent('MouseEvents'),
        a    = document.createElement('a')

    a.download = filename
    a.href = window.URL.createObjectURL(blob)
    a.dataset.downloadurl =  ['text/js', a.download, a.href].join(':')
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    a.dispatchEvent(e)
 }
})(console)

console.save(questCollection, ticketNum + ".js")

var pipi = "https://tests24.ru/?iter=4&bil=" + (Number(numberto) + 1) + "&test=615";
window.location.href = pipi;
