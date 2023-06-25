var quizPos = 0;

const question = (title, options, correctIndex, img = "/img/hengelo-vlag-no-sub.png") => {
    return {
        "title": title,
        "options": options,
        "correct": options[correctIndex],
        "corIdx": correctIndex,
        "img": img
    }
}

const noneSelected = () => document.querySelector('input[name="quiz-option"]:checked') == null

const updateQuiz = () => {
    document.getElementById("quiz-header").textContent = `Hengelo Quiz (${quizPos + 1} / ${questions.length})`;
    document.getElementById("quiz-content").innerHTML = generateQuizContent();
    document.getElementById("quiz-logo").src = questions[quizPos].img;
}


const questions = [
    question("Hoeveel inwoners heeft Hengelo?", ['82.384', '72.311', '101.785', '90.072'], 0),
    question("Hoeveel middelbare scholen heeft Hengelo?", ["4", "10", "8", "7"], 3, 'https://image.routeyou.com/shrink/fit/480x280/6cf7f57574d858034e2963c28d52eb20_d989d29ebf7adcd82a67593036e86598266f485f.jpg'),
    question("Wat is de bekendste kerk in Hengelo?", ["Sint-Lambertusbasiliek", "Sint-Pieterskerk", "De Hengloose kerk"], 0, 'https://www.visitmedemblik.nl/media/153315/afbeelding-1.jpg?mode=pad&width=1920&format=jpg'),
    question("Is Hengelo een dorp of een stad?", ['Dorp', 'Stad'], 0, 'https://hengelo.nu/wp-content/uploads/2021/09/Enschedesestraat-Hengelo-4.jpg'),
    question("Wat is de naam van het poppodium van Hengelo?", ['Muziekcafe Interpol', 'De Effenaar', 'Muziek Centrum Hengelo', 'Metropool'], 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Metropool.jpg/1200px-Metropool.jpg'),
    question("Hoeveel treinstations heeft Hengelo?", [1, 2, 3, 4], 2, 'https://www.iaa-architecten.nl/img/685/B1400X1400/Station+Hengelo+archief+overijssel.jpg'),
    question("Wat is de Nedersaksische naam voor Hengelo?", ["Oangel", "Olde Hengel", "Hengel", "Hengeloo"], 2, 'https://images0.persgroep.net/rcs/bfb_TDRedezQfmZnQ2LiYIkZBps/diocontent/163765394/_fitwidth/694/?appId=21791a8992982cd8da851550a453bd7f&quality=0.8'),
    question("Wat is een <i>'Hengeloërtje'</i>?", ['Een dropje in de vorm van de stadhuis toren', 'Hengelos Biertje', 'Een Traditioneel Hengeloos Borreltje', 'Een paaltje in de vorm van de stadhuistoren'], 3, 'https://soc.kuleuven.be/fsw/studentenportaal/afbeeldingen/Vraagteken%20verzoekschriften%20-%20shutterstock.jpg/image'),
    question("Hoe heet de toren op het marktplein?", ['Binktoren', 'Broncktoren', 'Brinktoren', 'Markttoren'], 2, 'https://images0.persgroep.net/rcs/5znnnYXQchh0yqYg1V4induNiB8/diocontent/139768463/_fitwidth/694/?appId=21791a8992982cd8da851550a453bd7f&quality=0.8'),
    question("Welke school is vernoemd naar een beroemde textielfabrikant?", ['\'t Genseler', 'Twickel', 'Montessori', 'C.T Stork College'], 3, 'https://media.indebuurt.nl/hengelo/2020/09/05111310/34093519_922539427925998_5321672493600079872_n.jpg'),
]
var userAnswers = []; // Array[Int]
questions.forEach(_ => { userAnswers.push(null); }); // {0};

/* ************************************************************************************************************ */
function nextQuestion() {
    if (noneSelected()) {
        alert("maak een selectie");
        return;
    }

    let answer = document.querySelector('input[name="quiz-option"]:checked');
    let ansIdx = +answer.id.split("-")[1]

    userAnswers[quizPos] = ansIdx;

    quizPos += 1;
    updateQuiz();

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
    updateQuiz();

    let curAns = userAnswers[quizPos];
    if (curAns != null) {
        document.getElementById('opt-' + curAns).checked = true;
    }
}
function endQuiz() {
    if (noneSelected()) {
        alert("maak een selectie");
        return;
    }
    let answer = document.querySelector('input[name="quiz-option"]:checked');
    userAnswers[quizPos] = +answer.id.split("-")[1]

    document.getElementById("quiz-logo").hidden = true;

    var rightAnswers = 0;
    var questionEntries = [];
    for (let i = 0; i < questions.length; i++) {
        let answerRight = userAnswers[i] === questions[i].corIdx;

        if (answerRight) {
            rightAnswers += 1;
        }

        questionEntries.push(
            [
                i + 1, questions[i].title,
                questions[i].options[userAnswers[i]],
                questions[i].correct,
                (answerRight)? "ja" : "nee"
            ]
        )
    }
    let score = Math.round((rightAnswers / questions.length) * 100);

    document.getElementById("quiz-header").textContent = `resultaat: ${rightAnswers} / ${questions.length} goed (${score}%)`;
    document.getElementById("quiz-win").innerHTML += `
        <button
            style="position: absolute; right: 1%; top: 90%"
            onclick="document.location.href = '/'">
        Verlaat quiz
        </button>`;

    var tableEntries = "";
    questionEntries.forEach(qe => {
        tableEntries += "<tr>";
        qe.forEach(p => {
            tableEntries += "<th>" + p + "</th>";
        })
        tableEntries += "</tr>";
    })

    document.getElementById("quiz-content").innerHTML = `
    <div class="sunken-panel">
    <table class="interactive">
      <thead>
        <tr>
          <th>nr.</th>
          <th>vraag</th>
          <th>jouw antwoord</th>
          <th>goed antwoord</th>
          <th>goed</th>
        </tr>
      </thead>
      <tbody>
        ${tableEntries}
      </tbody>
    </table>
  </div>`;
    document.getElementById("quiz-logo").src = "/img/hengelo-vlag-no-sub.png";
}

/* ************************************************************************************************************ */

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
updateQuiz();