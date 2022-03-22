export interface Question {
  idTrivia?: number;
  question: string;
  answers: string[];
}
export interface QuizResponse {
  questions: Question[];
}

export interface Trivia {
  id: number
  name: string;
  image: string;
  description?: string;
}