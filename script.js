// Array of Questions (task + correct answer + options)
const questions = [
    {
        task: "Open Command Palette",
        correct: "Ctrl+Shift+P",
        options: ["Ctrl+P", "Ctrl+Shift+P", "Ctrl+Alt+P", "Alt+Shift+P"]
    },
    {
        task: "Add Cursor to Next Match",
        correct: "Ctrl+D",
        options: ["Ctrl+L", "Ctrl+D", "Ctrl+Alt+Down", "Ctrl+M"]
    },
    {
        task: "Add Cursor Above",
        correct: "Ctrl+Alt+Up",
        options: ["Alt+Up", "Ctrl+Alt+Up", "Ctrl+Up", "Shift+Up"]
    },
    {
        task: "Add Cursor Below",
        correct: "Ctrl+Alt+Down",
        options: ["Ctrl+Alt+Down", "Alt+Down", "Ctrl+Down", "Shift+Down"]
    },
    {
        task: "Duplicate Line",
        correct: "Shift+Alt+Down",
        options: ["Ctrl+D", "Shift+Alt+Down", "Alt+Down", "Ctrl+Shift+D"]
    },
    {
        task: "Comment Line",
        correct: "Ctrl+/",
        options: ["Ctrl+K", "Ctrl+/", "Alt+/", "Shift+/"]
    },
    {
        task: "Open Terminal",
        correct: "Ctrl+`",
        options: ["Ctrl+T", "Ctrl+Shift+T", "Ctrl+`", "Alt+`"]
    },
    {
        task: "Find in File",
        correct: "Ctrl+F",
        options: ["Ctrl+F", "Ctrl+Shift+F", "Alt+F", "Ctrl+Alt+F"]
    },
    {
        task: "Replace in File",
        correct: "Ctrl+H",
        options: ["Ctrl+R", "Ctrl+Shift+H", "Ctrl+H", "Alt+H"]
    },
    {
        task: "Save File",
        correct: "Ctrl+S",
        options: ["Ctrl+S", "Alt+S", "Ctrl+Shift+S", "Ctrl+Alt+S"]
    },
    {
        task: "Select All",
        correct: "Ctrl+A",
        options: ["Ctrl+Shift+A", "Ctrl+Alt+A", "Ctrl+A", "Alt+A"]
    },
    {
        task: "Go to Line",
        correct: "Ctrl+G",
        options: ["Ctrl+L", "Ctrl+G", "Alt+G", "Shift+G"]
    },
    {
        task: "Move Line Up",
        correct: "Alt+Up",
        options: ["Alt+Up", "Ctrl+Up", "Shift+Alt+Up", "Ctrl+Alt+Up"]
    },
    {
        task: "Move Line Down",
        correct: "Alt+Down",
        options: ["Alt+Down", "Ctrl+Down", "Shift+Alt+Down", "Ctrl+Alt+Down"]
    },
    {
        task: "Toggle Sidebar",
        correct: "Ctrl+B",
        options: ["Ctrl+B", "Ctrl+Shift+B", "Alt+B", "Ctrl+Alt+B"]
    },

];

// Variables declared
let userName = '';
let currentIndex = 0;
let score = 0;
let timer;
let timeLeft = 15;
let quizQuestions = [];


// Get all required DOM elements
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const quizBox = document.getElementById("quizBox");
const introScreen = document.getElementById("introScreen");
const resultBox = document.getElementById("resultBox");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const finalScoreEl = document.getElementById("finalScore");

// for shuffle questions order
function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
}


// quiz start function
function startQuiz() {
    userName = prompt("Enter your name to begin:");

    if (!userName || userName.trim() === "") {
        alert("Please enter your name to start!");
        return;
    }

    alert(`Hey ${userName}! 🚀\n\nGet ready for your quick test!\n\n👉 You'll get 5 random questions\n✅ +1 for correct answers\n❌ -1 for wrong answers\n⏱️ 15 seconds per question\n🧠 Final score will be shown at the end!\n\nGood luck! 🎯`);

    document.getElementById("mainHeader").classList.add("hidden");
    document.getElementById("mainFooter").classList.add("hidden");
    introScreen.classList.add("hidden");
    resultBox.classList.add("hidden");
    quizBox.classList.remove("hidden");

    score = 0;
    currentIndex = 0;
    quizQuestions = shuffle([...questions]).slice(0, 5);
    scoreEl.textContent = score;

    loadQuestion();
}


function loadQuestion() {
    clearInterval(timer);
    timeLeft = 15;
    timerEl.textContent = timeLeft;

    const q = quizQuestions[currentIndex];
    questionEl.textContent = `Press the shortcut for: ${q.task}`;

    const shuffledOptions = shuffle([...q.options]);
    optionsEl.innerHTML = '';

    shuffledOptions.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.onclick = () => checkAnswer(option);
        optionsEl.appendChild(btn);
    });

    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function checkAnswer(selected) {
    const correct = quizQuestions[currentIndex].correct;

    const buttons = optionsEl.querySelectorAll("button");

    buttons.forEach(btn => {
        btn.disabled = true; // disable all buttons after selection

        if (btn.textContent === correct) {
            btn.style.backgroundColor = "#218838";
            btn.style.color = "white";
        }

        if (btn.textContent === selected && selected !== correct) {
            btn.style.backgroundColor = "#C82333";
            btn.style.color = "white";
        }
    });

    if (selected === correct) {
        score++;
    } else {
        score--;
    }
    scoreEl.textContent = score;
    clearInterval(timer);

    // just wait for 1 sec to jump on next question
    setTimeout(nextQuestion, 1000);
}

function nextQuestion() {
    currentIndex++;
    if (currentIndex >= quizQuestions.length) {
        endQuiz();
    } else {
        loadQuestion();
    }
}

function endQuiz() {
    quizBox.classList.add("hidden");
    resultBox.classList.remove("hidden");
    finalScoreEl.textContent = `${userName}, your score is ${score} out of 5 🎉`;
}

startBtn.addEventListener("click", startQuiz);

restartBtn.addEventListener("click", () => {
    introScreen.classList.remove("hidden");
    resultBox.classList.add("hidden");

    // For again show header & footer 
    document.getElementById("mainHeader").classList.remove("hidden");
    document.getElementById("mainFooter").classList.remove("hidden");
});


document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
  alert("Oye hoye! Right-click allowed nahi hai boss 😎");
});
