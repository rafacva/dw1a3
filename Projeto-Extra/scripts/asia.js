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
        question: 'Amã',
        choice1: 'Arábia Saudita',
        choice2: 'Jordânia',
        choice3: 'Mongólia',
        choice4: 'Sri Lanka',
        answer: 2,
    },
    {
        question: 'Cidade do Kuwait',
        choice1: "Omã",
        choice2: "Emirados Árabes Unidos",
        choice3: "Iêmen",
        choice4: "Kuwait",
        answer: 4,
    },
    {
        question: 'Ramallah',
        choice1: "Palestina",
        choice2: "Egito",
        choice3: "Síria",
        choice4: "Turquia",
        answer: 1,
    },
    {
        question: 'Bagdá',
        choice1: "Líbano",
        choice2: "Iraque",
        choice3: "Síria",
        choice4: "Camboja",
        answer: 2,
    },
    {
        question: 'Damasco',
        choice1: "Síria",
        choice2: "Egito",
        choice3: "Iraque",
        choice4: "Irã",
        answer: 1,
    },
    {
        question: 'Daca',
        choice1: "Mianmar",
        choice2: "Coreia do Norte",
        choice3: "Sri Lanka",
        choice4: "Bangladesh",
        answer: 4,
    },
    {
        question: 'Duxambé',
        choice1: "Kazaquistão",
        choice2: "Tadjiquistão",
        choice3: "Turcomenistão",
        choice4: "Quirguistão",
        answer: 2,
    },
    {
        question: 'Islamabad',
        choice1: "Kazaquistão",
        choice2: "Quirguistão",
        choice3: "Paquistão",
        choice4: "Uzbequistão",
        answer: 3,
    },
    {
        question: 'Hanói',
        choice1: "Mianmar",
        choice2: "Vietnã",
        choice3: "Turquia",
        choice4: "China",
        answer: 2,
    },
    {
        question: 'Singapura',
        choice1: "Singapura",
        choice2: "Indonésia",
        choice3: "Malásia",
        choice4: "Benim",
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
