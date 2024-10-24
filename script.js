// The sample for the questions for the quiz
const questions = [
    {
        question: "Who is the main protagonist for Halo?",
        options: ["Noble Six", "Master Chief", "Spartan Hudson Griffin", "Spartan Jameson Locke", "Commander Sarah Palmer"],
        answer: "Master Chief"
    },
    {
        question: "What is the capital of Canada?",
        options: ["Montreal", "New Brunswick", "Illinois", "Ontario"],
        answer: "Ontario"
    },
    {
        question: "Which HTML tag is used to define a paragraph?",
        options: ["&lt;p&gt;", "&lt;div&gt;", "&lt;h1&gt;", "&lt;span&gt;"],
        answer: "&lt;p&gt;"
    },
    {
        question: "Which car brand does the R8 belong to?",
        options: ["Mercedes Benz", "Ferrari", "Lamborghini", "BMW", "Audi"],
        answer: "Audi"
    }
];

let currentQuestionIndex = 0;
let score = 0;

// The ake authentication
function authenticateUser() {
    const username = prompt("Enter your username to begin the quiz:");
    if (username) {
        alert(`Welcome, ${username}! Let the quiz begin.`);
        displayQuestion();
    } else {
        alert("The authentication has failed. Please refresh to start over again.");
    }
}

// The function to display the current questions
function displayQuestion() {
    const questionContainer = document.getElementById('quizForm');
    questionContainer.innerHTML = ''; // Clear previous content
    const currentQuestion = questions[currentQuestionIndex];

    const fieldset = document.createElement('fieldset');
    const legend = document.createElement('legend');
    legend.textContent = currentQuestion.question;
    fieldset.appendChild(legend);

    currentQuestion.options.forEach(option => {
        const label = document.createElement('label');
        label.innerHTML = `
            <input type="radio" name="q${currentQuestionIndex + 1}" value="${option}"> ${option}
        `;
        fieldset.appendChild(label);
    });

    const submitButton = document.createElement('button');
    submitButton.textContent = "Submit your answer";
    submitButton.type = "button"; // To prevent the form from submitting 
    submitButton.addEventListener('click', checkAnswer);
    fieldset.appendChild(submitButton);

    questionContainer.appendChild(fieldset);
}

// The function to check what the user has answer
function checkAnswer() {
    const selectedOption = document.querySelector(`input[name="q${currentQuestionIndex + 1}"]:checked`);
    if (!selectedOption) {
        Caution("Please pick an answer before moving to the next one!");
        return;
    }

    const userAnswer = selectedOption.value;
    const currentQuestion = questions[currentQuestionIndex];

    const feedback = document.createElement('div');
    if (userAnswer === currentQuestion.answer) {
        feedback.classList.add('correct');
        feedback.textContent = "That answer is Correct!";
        score++;
    } else {
        feedback.classList.add('incorrect');
        feedback.textContent = `That answer is Incorrect! The correct answer is: ${currentQuestion.answer}`;
    }

    const questionContainer = document.getElementById('quizForm');
    questionContainer.appendChild(feedback);

    currentQuestionIndex++;

    // The process to move to next question or finish the quiz
    if (currentQuestionIndex < questions.length) {
        setTimeout(() => {
            questionContainer.removeChild(feedback);
            displayQuestion();
        }, 3000); // Wait for at least three seconds before showing the next question
    } else {
        setTimeout(showFinalScore, 3000);
    }
}

// The function to display the final score
function showFinalScore() {
    const questionContainer = document.getElementById('quizForm');
    questionContainer.innerHTML = `<h2>Your final score is: ${score} out of ${questions.length}</h2>`;
}

// Begin the quiz with the authentication
authenticateUser();
