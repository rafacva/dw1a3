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
        question: 'Pretória',
        choice1: 'Moçambique',
        choice2: 'Guiné Equatorial',
        choice3: 'África do Sul',
        choice4: 'Eritreia',
        answer: 3,
    },
    {
        question:"Luanda",
        choice1: "Essuatíni",
        choice2: "Angola",
        choice3: "Quênia",
        choice4: "Uganda",
        answer: 2,
    },
    {
        question: "Lilongué",
        choice1: "Malawi",
        choice2: "Seicheles",
        choice3: "Zimbabwe",
        choice4: "Libéria",
        answer: 1,
    },
    {
        question: "Acra",
        choice1: "Guiné",
        choice2: "Benim",
        choice3: "República do Congo",
        choice4: "Gana",
        answer: 4,
    },
    {
        question: "Dacar",
        choice1: "Burquina Fasso",
        choice2: "Senegal",
        choice3: "Somália",
        choice4: "Serra Leoa",
        answer: 2,
    },
    {
        question: "Bissau",
        choice1: "Argélia",
        choice2: "São Tomé e Príncipe",
        choice3: "Níger",
        choice4: "Guiné-Bissau",
        answer: 4,
    },
    {
        question: "Trípoli",
        choice1: "Líbia",
        choice2: "Burundi",
        choice3: "Gabão",
        choice4: "Sudão",
        answer: 1,
    },
    {
        question: "Túnis",
        choice1: "Chade",
        choice2: "Mauritânia",
        choice3: "Tunísia",
        choice4: "Djibouti",
        answer: 3,
    },
    {
        question: "Rabat",
        choice1: "Quênia",
        choice2: "Marrocos",
        choice3: "Gâmbia",
        choice4: "Ruanda",
        answer: 2,
    },
    {
        question: "Adis Abeba",
        choice1: "Etiópia",
        choice2: "Mali",
        choice3: "Camarões",
        choice4: "Tanzânia",
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
