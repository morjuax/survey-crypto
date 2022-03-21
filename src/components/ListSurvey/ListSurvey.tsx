import './ListSurvey.scss'
import { Fragment, useEffect, useState } from 'react';
import QuizService from '../../services/quiz.service';
import { Question } from '../../interfaces/quiz.inteface';
import ItemSurvey from '../ItemSurvey/ItemSurvey';
import { Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

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
            <ItemSurvey key={i} question={q.question} answers={q.answers}/>
          )
        })
        }
      </ul>
      <div className="boxButton">
        <Button className="btnProcess"
                size="large"
                color="primary"
                variant="contained"
                startIcon={<SaveIcon />}
        >Finalize Quiz</Button>
      </div>
    </Fragment>
  )
}