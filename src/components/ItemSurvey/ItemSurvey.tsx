import './ItemSurvey.scss'
import SendIcon from '@material-ui/icons/Send';
import { Checkbox } from '@material-ui/core';
import { ChangeEvent, useEffect, useState } from 'react';
import { ItemAnswer, State } from './state.interface';

interface Props {
  question: string;
  answers: string[];
  qTag: string;
}

export default function ItemSurvey({question, answers, qTag}: Props) {
  const [state, setState] = useState<State>({
    list: [],
  })

  useEffect(() => {
    const answerParsed = answers.map((item) => ({
      answer: item,
      checked: false,
    }))
    setState({...state, list: answerParsed});
  }, [])
  
  function handleChange(a: ItemAnswer): any {
    a.checked = !a.checked;
  }

  return (
    <li className="item">
      <div className="boxQuestion">
        <div className="icon"><SendIcon/></div>
        <div className="question">{question}</div>
      </div>
      <div className="boxAnswers">
        <ul>
          {state.list.map((a, i) => {
            return (
              <li key={i}>
                <Checkbox
                  id={`custom-checkbox-${i}`}
                  name={qTag}
                />
                <div className="answer">{a.answer}</div>
              </li>
            )
          })}
        </ul>
      </div>
    </li>
  )
}