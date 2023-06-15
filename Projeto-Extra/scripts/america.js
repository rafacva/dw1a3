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
        question: 'Brasília',
        choice1: 'Suriname',
        choice2: 'Brasil',
        choice3: 'Guiana',
        choice4: 'Dominica',
        answer: 2,
    },
    {
        question: 'Washington',
        choice1: "Libéria",
        choice2: "Haiti",
        choice3: "Peru",
        choice4: "Estados Unidos",
        answer: 4,
    },
    {
        question: 'Bogotá',
        choice1: "Venezuela",
        choice2: "Colombia",
        choice3: "Equador",
        choice4: "Granada",
        answer: 2,
    },
    {
        question: 'Quito',
        choice1: "Equador",
        choice2: "Colombia",
        choice3: "Venezuela",
        choice4: "Granada",
        answer: 1,
    },
    {
        question: 'Caracas',
        choice1: "Equador",
        choice2: "Venezuela",
        choice3: "Colombia",
        choice4: "Granada",
        answer: 2,
    },
    {
        question: 'San José',
        choice1: "Panamá",
        choice2: "Costa Rica",
        choice3: "República Dominicana",
        choice4: "Haiti",
        answer: 2,
    },
    {
        question: 'Assunção',
        choice1: "Costa Rica",
        choice2: "Panamá",
        choice3: "Peru",
        choice4: "Paraguai",
        answer: 4,
    },
    {
        question: 'Montevidéu',
        choice1: "Uruguai",
        choice2: "Argentina",
        choice3: "Guatemala",
        choice4: "Honduras",
        answer: 1,
    },
    {
        question: 'Buenos Aires',
        choice1: "Guatemala",
        choice2: "Honduras",
        choice3: "Nicarágua",
        choice4: "Argentina",
        answer: 4,
    },
    {
        question: 'Manágua',
        choice1: "Guatemala",
        choice2: "Argentina",
        choice3: "Nicarágua",
        choice4: "Honduras",
        answer: 3,
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

        return window.location.assign('./end.html')
    }

    questionCounter++
    progressText.innerText = `Questão ${questionCounter} de ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

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
