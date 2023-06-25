var quizPos = 0;

const question = (title, options, correctIndex) => {
    return {
        "title": title,
        "options": options,
        "correct": options[correctIndex],
        "corIdx": correctIndex,
    }
}

const noneSelected = () => {
    return document.querySelector('input[name="quiz-option"]:checked') == null
}

const questions = [
    question("Hoeveel middelbare scholen heeft Hengelo?", ["4", "10", "8", "7"], 4),
    question("Q2", [1,2,3], 2)
]
var userAnswers = []; // Array[Int]
questions.forEach(_ => { userAnswers.push(null); }); // {0};

function nextQuestion() {
    if (noneSelected()) {
        alert("maak een selectie")
        return;
    }

    let answer = document.querySelector('input[name="quiz-option"]:checked');
    let ansIdx = +answer.id.split("-")[1]

    userAnswers[quizPos] = ansIdx;

    quizPos += 1;
    document.getElementById("quiz-header").textContent = `Hengelo Quiz (${quizPos + 1}/${questions.length})`;
    document.getElementById("quiz-content").innerHTML = generateQuizContent();

    let curAns = userAnswers[quizPos];
    if (curAns != null) {
        document.getElementById('opt-' + curAns).checked = true;
    }
}
function prevQuestion() {
    let answer = document.querySelector('input[name="quiz-option"]:checked');
    if (answer != null) {
        userAnswers[quizPos] = +answer.id.split("-")[1]
    }

    quizPos -= 1;
    document.getElementById("quiz-header").textContent = `Hengelo Quiz (${quizPos + 1}/${questions.length})`;
    document.getElementById("quiz-content").innerHTML = generateQuizContent();

    let curAns = userAnswers[quizPos];
    if (curAns != null) {
        document.getElementById('opt-' + curAns).checked = true;
    }
}

function generateQuizContent() {
    const q = questions[quizPos];

    var fieldRows = "";
    for (let i = 0; i < q.options.length; i++) {
        fieldRows += `
<div id="field-row">
    <input type="radio" id="opt-${i}" name="quiz-option">
    <label for="opt-${i}">${q.options[i]}</label>
</div>
`;
    }

    var buttons = [
        (quizPos + 1 === questions.length)?
            '<button style="position: absolute; top: 87%; left: 90%;" onclick="endQuiz()">beëindig quiz</button>' :
            '<button style="position: absolute; top: 87%; left: 89%;" onclick="nextQuestion()">volgende vraag</button>',
    ];

    if (quizPos !== 0) {
        let b0 = buttons[0];
        buttons[0] =
            '<button style="position: absolute; top: 87%; left: 80%;" onclick="prevQuestion()">vorige vraag</button>'
        buttons[1] = b0;
    }

    return `
<div style="width: 100%">
    <h4>${q["title"]}</h4>
    <fieldset>
        <legend>Antwoord</legend>
    ${fieldRows}
    </fieldset>
    ${buttons.join("\n")}
</div>
`;
}

/* on startup */
document.getElementById("quiz-header").textContent = `Hengelo Quiz (${quizPos + 1}/${questions.length})`;
document.getElementById("quiz-content").innerHTML = generateQuizContent();