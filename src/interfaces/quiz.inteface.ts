export interface Question {
  question: string;
  answers: string[];
}
export interface QuizResponse {
  questions: Question[];
}