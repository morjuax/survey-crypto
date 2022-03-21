import './ListSurvey.scss'
import { Fragment, useEffect, useState } from 'react';
import QuizService from '../../services/quiz.service';
import { Question } from '../../interfaces/quiz.inteface';
import ItemSurvey from '../ItemSurvey/ItemSurvey';

export default function ListSurvey() {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    async function getQuestions() {
      const questions = await QuizService.getQuestions();
      setQuestions(questions);
    }
    getQuestions()
  }, [questions]);

  return (
    <Fragment>
      <h4>Quiz</h4>
      <ul>
        {questions.map((q, i) => {
          return (
            <ItemSurvey i={i} question={q.question} answers={q.answers}/>
          )
        })
        }
      </ul>
    </Fragment>
  )
}