import './ItemSurvey.scss'
import SendIcon from '@material-ui/icons/Send';
import { Checkbox } from '@material-ui/core';

interface Props {
  i: number;
  question: string;
  answers: string[]
}

export default function ItemSurvey({i, question, answers}: Props) {
  return (
    <li key={i} className="item">
      <div className="boxQuestion">
        <div className="icon"><SendIcon/></div>
        <div className="question">{question}</div>
      </div>
      <div className="boxAnswers">
        <ul>
          {answers.map((a, i) => {
            return (
              <li key={i}>
                <Checkbox
                  id={`custom-checkbox-${i}`}
                  // checked={checked}
                  // onChange={handleChange}
                  name={`answerCheck-${i}`}
                />
                <div className="answer">{a}</div>
              </li>
            )
          })}
        </ul>
      </div>
    </li>
  )
}