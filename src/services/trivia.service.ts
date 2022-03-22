import Trivia from '../assets/Trivias.json';
import { Trivia as TriviaI } from '../interfaces/quiz.inteface';

class TriviaService {
  async getAll(): Promise<TriviaI[] | []> {
    try {
      return Trivia.data;
    } catch (error) {
      console.log('ERROR: reading trivia json')
      return [];
    }
  }
}

export default new TriviaService();
