let countSpan = document.querySelector(".count span");
let bullets = document.querySelector(".bullets .spans");

function getQuestions(){
    let myRequest = new XMLHttpRequest();

    myRequest.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200){
            let questionsObject = JSON.parse(this.responseText);
            let questionsCount = questionsObject.length;
            createBullets(questionsCount);
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