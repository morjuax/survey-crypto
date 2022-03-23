import './ItemSurvey.scss'
import SendIcon from '@material-ui/icons/Send';
import { Checkbox } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { State } from './state.interface';

interface Props {
  question: string;
  answers: string[];
  qTag: string;
  onChangeCheckbox: (i: number) => void;
}

export default function ItemSurvey({question, answers, qTag, onChangeCheckbox}: Props) {
  const [state, setState] = useState<State>({
    list: [],
    answers: [],
  })

  useEffect(() => {
    const answerParsed = answers.map((item) => ({
      answer: item,
      checked: false,
    }))
    setState({...state, list: answerParsed});
  }, [])
  
  function handleChange(i: number): any {
    setState({...state, answers: [...state.answers, i]})

    onChangeCheckbox(i)
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
                  onChange={() => handleChange(i)}
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