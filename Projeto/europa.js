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
        flag: 'alemanha.png',
        choice1: 'Bélgica',
        choice2: 'Alemanha',
        choice3: 'Noruega',
        choice4: 'Estônia',
        answer: 2,
    },
    {
        flag: "belgica.png",
        choice1: "Chipre",
        choice2: "Alemanha",
        choice3: "Romênia",
        choice4: "Bélgica",
        answer: 4,
    },
    {
        flag: "polonia.png",
        choice1: "Polônia",
        choice2: "Dinamarca",
        choice3: "Bósnia e Herzegovina",
        choice4: "Croácia",
        answer: 1,
    },
    {
        flag: "monaco.png",
        choice1: "Portugal",
        choice2: "Mônaco",
        choice3: "Sérvia",
        choice4: "Holanda",
        answer: 2,
    },
    {
        flag: "malta.png",
        choice1: "Malta",
        choice2: "Montenegro",
        choice3: "Armênia",
        choice4: "Chipre",
        answer: 1,
    },
    {
        flag: "austria.png",
        choice1: "Eslovênia",
        choice2: "Eslováquia",
        choice3: "Tchéquia",
        choice4: "Áustria",
        answer: 4,
    },
    {
        flag: "italia.png",
        choice1: "Bulgária",
        choice2: "Itália",
        choice3: "Irlanda",
        choice4: "Geórgia",
        answer: 2,
    },
    {
        flag: "hungria.png",
        choice1: "Dinamarca",
        choice2: "Romênia",
        choice3: "Hungria",
        choice4: "Bielorrússia",
        answer: 3,
    },
    {
        flag: "letonia.png",
        choice1: "Andorra",
        choice2: "Letônia",
        choice3: "Chipre",
        choice4: "Luxemburgo",
        answer: 2,
    },
    {
        flag: "bulgaria.png",
        choice1: "Bulgária",
        choice2: "Hungria",
        choice3: "Tchéquia",
        choice4: "Moldávia",
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
