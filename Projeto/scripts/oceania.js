const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        flag: 'australia.png',
        choice1: 'Nauru',
        choice2: 'Austrália',
        choice3: 'Vanuatu',
        choice4: 'Nova Zelândia',
        answer: 2,
    },
    {
        flag: "papuang.png",
        choice1: "Indonésia",
        choice2: "Malásia",
        choice3: "Ilhas Marshall",
        choice4: "Papua-Nova Guiné",
        answer: 4,
    },
    {
        flag: "novazelandia.png",
        choice1: "Nova Zelândia",
        choice2: "Austrália",
        choice3: "Ilhas Keeling",
        choice4: "Nova Caledônia",
        answer: 1,
    },
    {
        flag: "fiji.png",
        choice1: "Palau",
        choice2: "Fiji",
        choice3: "Ilhas Cook",
        choice4: "Nova Zelândia",
        answer: 2,
    },
    {
        flag: "ilhassalomao.png",
        choice1: "Ilhas Salomão",
        choice2: "Nauru",
        choice3: "Timor-Leste",
        choice4: "Austrália",
        answer: 1,
    },
    {
        flag: "vanuatu.png",
        choice1: "Ilhas Cook",
        choice2: "Nova Caledônia",
        choice3: "Togo",
        choice4: "Vanuatu",
        answer: 4,
    },
    {
        flag: "samoa.png",
        choice1: "Nauru",
        choice2: "Samoa",
        choice3: "Malásia",
        choice4: "Sri Lanka",
        answer: 2,
    },
    {
        flag: "kiribati.png",
        choice1: "Ilhas Keeling",
        choice2: "Timor-Leste",
        choice3: "Kiribati",
        choice4: "Indonésia",
        answer: 3,
    },
    {
        flag: "tonga.png",
        choice1: "Toquelau",
        choice2: "Tonga",
        choice3: "Palau",
        choice4: "Timor-Leste",
        answer: 2,
    },
    {
        flag: "tuvalu.png",
        choice1: "Tuvalu",
        choice2: "Nova Caledônia",
        choice3: "Guam",
        choice4: "Nauru",
        answer: 1,
    },
]

const SCORE_POINTS = 1
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Questão ${questionCounter} de ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerHTML = `<img src="img/${currentQuestion.flag}" alt="Bandeira">`;

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()