var ticketNumText = document.querySelector(".quiz__ticketNum");
var question = document.querySelector(".quiz__question-text");
var questionNumText = document.querySelector(".quiz__question-number");
var answers = document.querySelector("ul.quiz__answers");

var ticketNum = 1;
var questionNum = 1;
var seconds = 3;
// tickets List

var ticketsList;
// function addContent(questionNum) {
//   while (answers.firstChild) {
//   answers.removeChild(answers.firstChild);
//   };


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

function countdown() {
      buttonPrev.setAttribute("disabled", "disabled");
      buttonNext.setAttribute("disabled", "disabled");
      seconds -= 1;
      if (seconds < 0) {
          // Chnage your redirection link here
          buttonPrev.removeAttribute("disabled");
          buttonNext.removeAttribute("disabled");
          buttonNext.click();
      } else {
          // Update remaining seconds
          if (questionNum == 5) {
            buttonPrev.removeAttribute("disabled");          
            document.getElementById("countdown").innerHTML = "Верно! Билет закончен, выбирай другой Билет!";
          } else {
            document.getElementById("countdown").innerHTML = "Верно! Следующий вопрос через " + seconds + " секунд.";
            // Count down using javascript
            window.setTimeout("countdown()", 1000);
          }
      }
}

function addContent(ticketNum, questionNum) {
  question.textContent = tickets[ticketNum - 1][questionNum - 1].quest;
  questionNumText.textContent = "Вопрос " + tickets[ticketNum - 1][questionNum - 1].num;
  ticketsList = document.querySelector(".module__tickets ul");
  ticketNumText.textContent = ticketNum;

  // лист всех билетов
  formTicketsList();

  deleteElemChildren(answers);

  for (var i = 0; i < tickets[ticketNum - 1][questionNum - 1].vary.length; i++) {
    var newAnswer = myCreateElement("li");
    var newAnswerLabel = myCreateElement("label");
    var newAnswerInput = myCreateElement("input");
    var textNode = myCreateTextNode(tickets[ticketNum - 1][questionNum - 1].vary[i]);

    newAnswer.classList.add("quiz__answer");

    mySetAttribute(newAnswerInput, "name", "quiz__answer");
    mySetAttribute(newAnswerInput, "type", "radio");
    mySetAttribute(newAnswerInput, "id", "ans__" + (i + 1));
    mySetAttribute(newAnswerInput, "value", i + 1);
    mySetAttribute(newAnswerLabel, "for", "ans__" + (i + 1));

    myAppendChild(newAnswerLabel, textNode);
    myAppendChild(newAnswer, newAnswerInput);
    myAppendChild(newAnswer, newAnswerLabel);
    myAppendChild(answers, newAnswer);

    newAnswerInput.addEventListener("click", () => buttonSubmit.click());

  }
}

addContent(ticketNum, questionNum);

// Clicks

var buttonNext = document.querySelector(".quiz__next");
var buttonPrev = document.querySelector(".quiz__prev");
var buttonSubmit = document.querySelector(".quiz__submit");

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
  seconds = 3;
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
    countdown();
  } else {
    document.querySelector("input:checked").parentElement.classList.add("quiz__answer--wrong");
    document.getElementById("countdown").innerHTML = "Не верно! Выбери другой вариант.";
  }
});

window.addEventListener("hashchange", function() {
  ticketNum = window.location.hash.substring(1);
  questionNum = 1;
  buttonPrev.disabled = true;
  buttonNext.disabled = false;
  addContent(ticketNum, questionNum);
  document.getElementById("countdown").innerHTML = "";
});
