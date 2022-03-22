import Quiz from '../assets/Quiz.json';
import { Question } from '../interfaces/quiz.inteface';

class QuizService {
  async getQuestions(idTrivia?: number): Promise<Question[] | []> {
    try {
      const dataStr = JSON.stringify(Quiz);
      const dataParsed = JSON.parse(dataStr);
      const trivia = dataParsed.data.find((item: any) => item.idTrivia === idTrivia);
      return trivia.questions;
    } catch (error) {
      console.log('ERROR: reading quiz json')
      return [];
    }
  }
}

export default new QuizService();
