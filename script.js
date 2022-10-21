let countSpan = document.querySelector(".count span");
let bullets = document.querySelector(".bullets .spans");
let questions = document.querySelector(".quiz-area");
let answers = document.querySelector(".answers-area");
let btn = document.querySelector(".submit");
let results = document.querySelector(".results");
let countdownHTML = document.querySelector(".countdown")

let currentIndex = 0;
let rightAnswerCount = 0;
let countdownInterval;

function getQuestions(){
    let myRequest = new XMLHttpRequest();

    myRequest.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200){
            let questionsObject = JSON.parse(this.responseText);
            let qCount = questionsObject.length;

            createBullets(qCount);
            addQuestionData(questionsObject[currentIndex], qCount);
            countdown(30, qCount);
            btn.onclick = function(){
                let rightAnswer = questionsObject[currentIndex].right_answer;
                currentIndex++;
                checkAnswer(rightAnswer, qCount);

                questions.innerHTML = '';
                answers.innerHTML = '';

                addQuestionData(questionsObject[currentIndex], qCount);

                handleBummets();

                clearInterval(countdownInterval);
                countdown(30, qCount);

                showResult(qCount);
            };
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
    if(currentIndex < count){
        let question = document.createElement("h2");
        question.textContent = obj.title;
        questions.appendChild(question);

        for (let i = 1; i <= 4; i++) {
            let answer = document.createElement("div");
            answer.className = "answer";

            let radio = document.createElement("input");
            radio.type = "radio";
            radio.name = "questions";
            radio.id = `answer_${i}`;

            let label = document.createElement('label');
            label.htmlFor = `answer_${i}`;
            label.textContent = obj[`answer_${i}`];

            answer.appendChild(radio);
            answer.appendChild(label);

            answers.appendChild(answer);
        }
    }
}

function checkAnswer(rAns, count){
    let answers = document.getElementsByName("questions");
    let theChoosenAnswer;

    for(let i=0; i < answers.length; i++){
        if(answers[i].checked){
            theChoosenAnswer = answers[i].nextElementSibling.textContent;
        }
    }
    if(rAns === theChoosenAnswer){
        rightAnswerCount++;
    }
}

function handleBummets(){
    let bullets = document.querySelectorAll(".bullets .spans span");
    let arrayOfSpans = Array.from(bullets);
    arrayOfSpans.forEach((span, index) => {
        if(currentIndex === index){
            span.className = "on";
        }
    });
}

function showResult(count){
    let result;
    if(currentIndex === count){
        questions.remove();
        answers.remove();
        btn.remove();
        bullets.parentElement.remove();

        if(rightAnswerCount > (count/2) && rightAnswerCount < count){
            result = `<span class="good">Good</span>, ${rightAnswerCount} From ${count}.`;
        }else if(rightAnswerCount === count){
            result = `<span class="perfect">Perfect</span>, ${rightAnswerCount} From ${count}.`;
        }else{
            result = `<span class="bad">bad</span>, ${rightAnswerCount} From ${count}.`;
        }
        results.innerHTML = result;
        results.style.padding = "10px";
        results.style.backgroundColor = "#fff";
        results.style.marginTop = "10px";
        results.style.borderRadius = "6px";
    }
}

function countdown(duration, count){
    if(currentIndex < count){
        let minutes, seconds;
        countdownInterval = setInterval(() => {
            minutes = parseInt(duration/60);
            seconds = parseInt(duration % 60);

            minutes = minutes < 10 ? `0${minutes}` : minutes;
            seconds = seconds < 10 ? `0${seconds}` : seconds;

            countdownHTML.innerHTML = `${minutes} : ${seconds}`;

            if(--duration < 0){
                clearInterval(countdownInterval);
                btn.click();
            }
        }, 1000);
    }
}