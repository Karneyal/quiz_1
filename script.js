// Questions, Options, and Clues
const questions = [
    {
        question: "Where in the Bible can you find the Lord’s Prayer?(బైబిల్లో మీరు ప్రభువు ప్రార్థనను ఎక్కడ కనుగొనగలరు?)",
        options: ["Luke 5  లూకా 5", "Matthew 6  మాథ్యూ 6", "John 3  జాన్ 3", "Mark 4  మార్క్ 4"],
        answer: "Matthew 6",
        clue: "Clue: You'll need to cross a big ocean next."
    },
    {
        question: "What was another name for the Apostle Paul?(అపొస్తలుడైన పౌలుకు మరో పేరు ఏమిటి?)",
        options: ["Peter పీటర్", "Saul of Tarsus టార్సస్ సౌలు", "John the Baptist బాప్తిస్ట్ యోహాను ", "Luke లూకా"],
        answer: "Saul of Tarsus టార్సస్ సౌలు",
        clue: "Clue: Next clue is hidden under the Eiffel Tower."
    },
    {
        question: "When the disciples saw Jesus walking on water, what did they think he was?(యేసు నీటిపై నడవడం శిష్యులు చూసినప్పుడు, ఆయన ఏమని అనుకున్నారు?)",
        options: ["A fisherman ఒక మత్స్యకారుడు", "A prophet  ఒక ప్రవక్త", "A ghost  ఒక దెయ్యం", "An angel  ఒక దేవదూత"],
        answer: "A ghost",
        clue: "Clue: Count the steps on the old staircase."
    },
    

];

let currentQuestionIndex = 0;
let wrongAttempts = 0;

// Load a question and display options
function loadQuestion() {
    document.getElementById("question").innerText = questions[currentQuestionIndex].question;
    let optionsHtml = "";
    questions[currentQuestionIndex].options.forEach((option, index) => {
        optionsHtml += `
            <div class="form-check">
                <input class="form-check-input" type="radio" name="option" id="option${index}" value="${option}">
                <label class="form-check-label" for="option${index}">
                    ${option}
                </label>
            </div>
        `;
    });
    document.getElementById("options").innerHTML = optionsHtml;
    document.getElementById("clue").innerText = ""; // Clear previous clue
    document.getElementById("submitBtn").classList.remove("d-none"); // Show submit button
}

// Check if the selected answer is correct
function checkAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
        const userAnswer = selectedOption.value;
        const correctAnswer = questions[currentQuestionIndex].answer;

        if (userAnswer === correctAnswer) {
            // Show the clue and end the quiz
            document.getElementById("clue").innerText = questions[currentQuestionIndex].clue; // Show clue
            document.getElementById("submitBtn").classList.add("d-none"); // Hide submit button after correct answer
        } else {
            // Keep asking until the answer is correct (without clue)
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                loadQuestion(); // Load next question if there are more
            } else {
                disqualifyUser(); // Disqualify after 5 wrong attempts
            }
        }
    } else {
        alert("Please select an answer!");
    }
}

// Show the disqualified message
function disqualifyUser() {
    document.getElementById("quiz-box").classList.add("d-none");
    document.getElementById("disqualified").classList.remove("d-none");
}

// Restart the quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    wrongAttempts = 0;
    document.getElementById("disqualified").classList.add("d-none");
    document.getElementById("quiz-box").classList.remove("d-none");
    loadQuestion();
}

// Load the first question on page load
window.onload = loadQuestion;
