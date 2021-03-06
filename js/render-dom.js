var ticketNumText = document.querySelector(".quiz__ticketNum");
var question = document.querySelector(".quiz__question-text");
var questionNumText = document.querySelector(".quiz__question-number");
var answers = document.querySelector("ul.quiz__answers");

var ticketNum = 1;
var questionNum = 1;
var interval = 1;
var scores = {
  questions: [],
  tries: []
};

// tickets List

var ticketsList;

//**************************

function deleteElemChildren(elem) {
  while (elem.firstChild) {
  elem.removeChild(elem.firstChild);
  };
}


function formTicketsList() {

  deleteElemChildren(ticketsList);

  for (var i = 0; i < tickets.length; i++) {
    var t = i+1;
    var newTicket = myCreateElement("li");
    var newTicketLink = myCreateElement("a");
    var newTicketTitle = document.createTextNode("Билет №" + (t));

    newTicket.classList.add("tickets__item");
    newTicketLink.addEventListener('click', moveToTop);

    mySetAttribute(newTicketLink, "href", "#" + (i + 1));

    myAppendChild(newTicketLink, newTicketTitle);
    myAppendChild(newTicket, newTicketLink);
    myAppendChild(ticketsList, newTicket);
  }
}


function myAppendChild(parent, child) {
  parent.appendChild(child);
}


function myCreateElement(elem) {
  return document.createElement(elem);
}


function myCreateTextNode(text) {
  return document.createTextNode(text);
}


function mySetAttribute(elem, name, value) {
  elem.setAttribute(name, value);
}


function moveToTop() {
  window.scrollTo(0, 0);
}


function countdown(seconds) {
  var timeoutMsg = "";

  buttonPrev.disabled = true;
  buttonNext.disabled = true;


  if (seconds <= 0) {
    buttonPrev.disabled = false;
    buttonNext.disabled = false;
    buttonNext.click();
    moveToTop();
  } else if (questionNum === tickets[ticketNum - 1].length) {
    buttonPrev.disabled = false;
    timeoutMsg = "Верно! Билет закончен, выбирай другой Билет!";
    createRaport();
  } else {
    timeoutMsg = "Верно! Следующий вопрос через " + seconds + " секунд.";
    window.setTimeout(countdown, 1000, seconds - 1);
  }

  document.getElementById("countdown").textContent = timeoutMsg;
}


function addContent(ticketNum, questionNum) {
  question.textContent = tickets[ticketNum - 1][questionNum - 1].quest;

  questionNumText.textContent = "Вопрос " + tickets[ticketNum - 1][questionNum - 1].num;

  ticketsList = document.querySelector(".module__tickets ul");

  ticketNumText.textContent = ticketNum;

  document.querySelector(".raport").classList.toggle("raport--show", false);

  collectTries = 0;

  // лист всех билетов
  deleteElemChildren(answers);

  formTicketsList();

  tickets[ticketNum - 1][questionNum - 1].vary.forEach(function (answer, i) {
    var newAnswer = myCreateElement("li");
    var newAnswerLabel = myCreateElement("label");
    var newAnswerInput = myCreateElement("input");

    newAnswer.classList.add("quiz__answer");

    mySetAttribute(newAnswerInput, "name", "quiz__answer");
    mySetAttribute(newAnswerInput, "type", "radio");
    mySetAttribute(newAnswerInput, "id", "ans__" + (i + 1));
    mySetAttribute(newAnswerInput, "value", i + 1);
    mySetAttribute(newAnswerLabel, "for", "ans__" + (i + 1));

    newAnswerLabel.textContent = answer;
    myAppendChild(newAnswer, newAnswerInput);
    myAppendChild(newAnswer, newAnswerLabel);
    myAppendChild(answers, newAnswer);

    newAnswerInput.addEventListener("click", () => buttonSubmit.click(), {once: true});
  });



  // for (var i = 0; i < tickets[ticketNum - 1][questionNum - 1].vary.length; i++) {
  //   var newAnswer = myCreateElement("li");
  //   var newAnswerLabel = myCreateElement("label");
  //   var newAnswerInput = myCreateElement("input");
  //   var textNode = myCreateTextNode(tickets[ticketNum - 1][questionNum - 1].vary[i]);
  //
  //   newAnswer.classList.add("quiz__answer");
  //
  //   mySetAttribute(newAnswerInput, "name", "quiz__answer");
  //   mySetAttribute(newAnswerInput, "type", "radio");
  //   mySetAttribute(newAnswerInput, "id", "ans__" + (i + 1));
  //   mySetAttribute(newAnswerInput, "value", i + 1);
  //   mySetAttribute(newAnswerLabel, "for", "ans__" + (i + 1));
  //
  //   myAppendChild(newAnswerLabel, textNode);
  //   myAppendChild(newAnswer, newAnswerInput);
  //   myAppendChild(newAnswer, newAnswerLabel);
  //   myAppendChild(answers, newAnswer);
  //
  //   newAnswerInput.addEventListener("click", () => buttonSubmit.click(), {once: true});
  // }
}

function createRaport() {
  document.querySelector(".raport").classList.toggle("raport--show", true);

  function sumTries() {
    var sum = 0;
    for (var i = 0; i < scores.tries.length; i++) {
      sum += scores.tries[i];
    }
    return sum;
  }

  var raportList = document.querySelector(".raport__list");
  deleteElemChildren(raportList);

  var corrAnswers = 0;

  for (var i = 0; i < questionNum; i++) {

    if (scores.tries[i] == 1) {corrAnswers += 1;}

    var raportItem = myCreateElement("li");
    raportItem.textContent = scores.tries[i] ? "Вопрос " + (i+1) + ": " + (scores.tries[i] === 2 ? "ответил правильно со " : "ответил правильно с ") + scores.tries[i] + " попытки." : "Вопрос " + (i+1) + ": пропущен.";
    myAppendChild(raportList, raportItem);
  }

  var raportCorrectText = myCreateTextNode("Ответил с первой попытки на " + corrAnswers + (corrAnswers === 1 ? " вопрос из " : (corrAnswers === 2 || corrAnswers === 3 || corrAnswers === 4 ? " вопроса из " : " вопросов из ")) + questionNum + ".");
  raportList.insertBefore(raportCorrectText, raportList.firstChild);

  var raportTitle = document.querySelector(".raport__title");
  deleteElemChildren(raportTitle);

  var raportTitleText = "";
  if (questionNum == 10) {
  raportTitleText = myCreateTextNode(corrAnswers >= scores.tries.length - 2 ? "Поздравляю, ты сдал!" : "Ты должен лучше стараться, иначе завалишься...");
} else {
  raportTitleText = myCreateTextNode(corrAnswers >= scores.tries.length - 1 ? "Поздравляю, ты сдал!" : "Ты должен лучше стараться, иначе завалишься...");
}

  myAppendChild(raportTitle, raportTitleText);
}

addContent(ticketNum, questionNum);

// Clicks

var buttonNext = document.querySelector(".quiz__next");
var buttonPrev = document.querySelector(".quiz__prev");
var buttonSubmit = document.querySelector(".quiz__submit");
var buttonRaportClose = document.querySelector(".raport__close");
var buttonShowCorrect = document.querySelector(".quiz__check");

function checkNumPrev(quest) {
  if (quest == 1) {
  buttonPrev.disabled = true;
  } else {
    buttonPrev.disabled = false;
  }
};

function checkNumNext(quest) {
  if (quest == tickets[ticketNum - 1].length - 1) {
  buttonNext.disabled = true;
  } else {
    buttonNext.disabled = false;
  }
};

checkNumPrev(questionNum);
checkNumNext(questionNum);

buttonNext.addEventListener("click", function() {
  document.getElementById("countdown").innerHTML = "";
  checkNumNext(questionNum);

  questionNum += 1;
  questionNumText.textContent = "Вопрос " + tickets[ticketNum - 1][questionNum - 1].num;
  question.textContent = tickets[ticketNum - 1][questionNum - 1].quest;

  checkNumPrev(questionNum);

  addContent(ticketNum, questionNum);

  document.getElementById("countdown").innerHTML = "";
});

buttonPrev.addEventListener("click", function() {
  document.getElementById("countdown").innerHTML = "";
  checkNumNext(questionNum);

  questionNum -= 1;
  questionNumText.textContent = "Вопрос " + tickets[ticketNum - 1][questionNum - 1].num;
  question.textContent = tickets[ticketNum - 1][questionNum - 1].quest;

  checkNumPrev(questionNum);

  addContent(ticketNum, questionNum);
});

buttonSubmit.addEventListener("click", function() {
  answersMarked = document.querySelectorAll(".quiz__answer");

  for (var t = 0; t < answersMarked.length; t++) {
    answersMarked[t].classList.toggle("quiz__answer--correct", false);
    answersMarked[t].classList.toggle("quiz__answer--wrong", false);
  }

  if (!document.querySelector("input:checked")) {
    alert("Проверка выполняется автоматически, просто выберите вариант ответа");
    return;
  }
  if (tickets[ticketNum - 1][questionNum - 1].correct == document.querySelector("input:checked").value) {
    document.querySelector("input:checked").parentElement.classList.add("quiz__answer--correct");

    collectTries += 1;
    scores.questions[questionNum - 1] = questionNum;
    scores.tries[questionNum - 1] = collectTries;

    countdown(interval);
  } else {
    document.querySelector("input:checked").parentElement.classList.add("quiz__answer--wrong", "quiz__answer--disabled");
    document.getElementById("countdown").innerHTML = "Не верно! Выбери другой вариант.";

    collectTries += 1;
  }
});

buttonRaportClose.addEventListener("click", () => document.querySelector(".raport").classList.remove("raport--show"));

buttonShowCorrect.addEventListener("click", function () {
  document.querySelectorAll(".quiz__answer label")[tickets[ticketNum - 1][questionNum - 1].correct - 1].setAttribute("style", "color: #1F1254; background-color: #00FFCC;");
});

window.addEventListener("hashchange", function() {
  ticketNum = window.location.hash.substring(1);
  questionNum = 1;
  buttonPrev.disabled = true;
  buttonNext.disabled = false;
  addContent(ticketNum, questionNum);
  document.getElementById("countdown").innerHTML = "";
});
