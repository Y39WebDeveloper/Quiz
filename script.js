let countSpan = document.querySelector(".count span");
let bullets = document.querySelector(".bullets .spans");
let questions = document.querySelector(".quiz-area");
let answers = document.querySelector(".answers-area");

let currentIndex = 0;

function getQuestions(){
    let myRequest = new XMLHttpRequest();

    myRequest.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200){
            let questionsObject = JSON.parse(this.responseText);
            let qCount = questionsObject.length;

            createBullets(qCount);
            addQuestionData(questionsObject[currentIndex], qCount);
        }
    }

    myRequest.open("GET", "questions.json", true);
    myRequest.send();
}

getQuestions();

function createBullets(num){
    countSpan.innerHTML = num;
    for(let i = 0; i < num; i++){
        let bullet = document.createElement("span");
        if(i == 0){bullet.className = "on";}
        bullets.appendChild(bullet);
    }
}

function addQuestionData(obj, count){
    let question = document.createElement("h2");
    question.textContent = obj.title;
    questions.appendChild(question);

    for(let i = 1; i <= 4; i++){
        let answer = document.createElement("div");
        answer.className = "answer";

        let radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "questions";
        radio.id = `answer_${i}`;
        radio.dataset.answer = obj[`answer_${i}`];

        let label = document.createElement('label');
        label.htmlFor = `answer_${i}`;
        label.textContent = obj[`answer_${i}`];

        answer.appendChild(radio);
        answer.appendChild(label);

        answers.appendChild(answer);
    }
}