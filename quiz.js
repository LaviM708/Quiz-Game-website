const quizData = [
    {
        question: "What is 2 + 2?",
        options: ["2", "3", "4", "5"],
        correctAnswerIndex: 2
    },
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        correctAnswerIndex: 0
    },
    {
        question: "How many continents are there on Earth?",
        options: ["5", "6", "7", "8"],
        correctAnswerIndex: 2
    },
    {
        question: "What is the capital of Japan?",
        options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
        correctAnswerIndex: 2
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question-text");
const answerButton = document.getElementById("answer-button");
const nextButton =document.getElementById("next-btn");


function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("score").textContent = " ";
    document.getElementById("restart-btn").style.display  = "none";
    document.getElementById("leaderboard-btn").style.display = "none";
    displayQuestion();
}


function displayQuestion() {
    let currentQuestion = quizData[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerText = questionNo+ ". " +currentQuestion.question;

    currentQuestion.options.forEach(option => {
        const buttons = document.querySelectorAll('#answer-buttons .btn');
        currentQuestion.options.forEach((option, index) => {
            buttons[index].textContent = option;
            buttons[index].onclick = () => checkAnswer(index);
        });
    });
}


function checkAnswer(selectedIndex) {  
    let currentQuestion = quizData[currentQuestionIndex];

    // Check if the answer is correct
    if (selectedIndex === currentQuestion.correctAnswerIndex) { 
        console.log("correct");
        score++;  
    } else {
        console.log("wrong");
        ("Incorrect. The correct answer is " + currentQuestion.options[currentQuestion.correctAnswerIndex]);
    }

    // Display the updated score after each question
    document.getElementById("score").textContent = `Your current score: ${score}` ;
        
    // Move to next question or end quiz  
    currentQuestionIndex++;  
    if (currentQuestionIndex < quizData.length) {  
        displayQuestion();  
    } else {  
        endQuiz();  
    }  
}
 

function endQuiz() {  
    document.getElementById("score").textContent = `Your score is ${score} out of ${quizData.length}`;  

    // Get logged-in user
    const userId = sessionStorage.loggedInUsrId;
    if (userId) {
        let usrObj = JSON.parse(localStorage[userId]);
        
        // Check and update the highest score
        if (!usrObj.highestScore || score > usrObj.highestScore) {
            usrObj.highestScore = score;
            localStorage[userId] = JSON.stringify(usrObj); // Save updated score
        }
    }


    // Show "Restart" and "Leaderboard" buttons
    document.getElementById("restart-btn").style.display = "inline";
    document.getElementById("leaderboard-btn").style.display = "inline";
}  


function goToLeaderboard(){
    window.location.href ="/HTML/ranking.html";
}


function logout() {
    // Clear the session storage
    sessionStorage.removeItem("loggedInUsrId");
    // Redirect to registration or login page
    window.location.href = "/HTML/index.html";
}


startQuiz();