import Quiz from '../assets/Quiz.json';
import { Question } from '../interfaces/quiz.inteface';

class QuizService {
  async getQuestions(): Promise<Question[] | []> {
    try {
      return Quiz.questions;
    } catch (error) {
      console.log('ERROR: reading quiz json')
      return [];
    }
  }
}

export default new QuizService();
