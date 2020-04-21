import _ from 'lodash'
import he from 'he'
import QuizFetcher from '../api/QuizFetcher'

class Quiz {
  constructor(question, correctAnswer, inCorrectAnswers) {
    this._question = question
    this._correctAnswer = correctAnswer
    this._inCorrectAnswers = inCorrectAnswers
  }

  get question () {
    return this._question
  }

  get correctAnswer () {
    return this._correctAnswer
  }

  get inCorrectAnswers () {
    return this._inCorrectAnswers
  }

  isCorrect (answer) {
    return this._correctAnswer === answer
  }

  shuffleAnswers () {
    return _.shuffle([this._correctAnswer, ...this._inCorrectAnswers])
  }

  static async fetchAndCreateQuizez () {
    const quizList = await QuizFetcher.fetchData()

    return quizList.map(result => {
      return {
        question: he.decode(result.question),
        correctAnswer: he.decode(result.correct_answer),
        inCorrectAnswers: result.in_correct_answers.map(ans => he.decode(ans))
      }
    }).map(quizData => new Quiz(quizData))
  }
}

export default Quiz