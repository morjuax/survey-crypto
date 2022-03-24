import './ListSurvey.scss'
import { Fragment, useEffect, useState } from 'react';
import QuizService from '../../services/quiz.service';
import { Question } from '../../interfaces/quiz.inteface';
import ItemSurvey from '../ItemSurvey/ItemSurvey';
import { Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import Web3Provider from '../../providers/web3.provider';
import { environment } from '../../enviroments/environment';
import { isSuccessfulTransaction } from '../../helpers/confirm';
import { BlockNumber, TransactionConfig } from 'web3-core';
import { getTimestampNowUtc } from '../../helpers/utils';
import Loading from '../Loading/Loading';
import SurveyContractService from '../../services/survey-contract.service';
import Message from '../Message/Message';
import MessageInterface from '../../interfaces/Message.interface';
import { useRecoilValue } from 'recoil';
import { addressState } from '../../state/atoms';
import { TypeAlert } from '../../enums/Alert.enum';

interface Props {
  id?: number;
}

const SurveyContract = require(`../../abis/survey-abi.json`);
const web3 = Web3Provider.getWeb3WithProvider();

export default function ListSurvey({ id }: Props) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isDisabledButton, setIsDisabledButton] = useState<boolean>(true);
  const [labelButton, setLabelButton] = useState<string>('Finalize Quiz');
  const [open, setOpen] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [message, setMessage] = useState<MessageInterface>({
    show: false,
  });
  const addressR = useRecoilValue(addressState)

  async function validateDateSubmit(): Promise<boolean> {
    const cooldown = await SurveyContractService.getCooldownSeconds()
    const lastSubmittal = await SurveyContractService.getLastSubmittal();
    const now = getTimestampNowUtc();
    return now > (Number(lastSubmittal) + Number(cooldown))
  }

  function isValidCheckboxes() {
    return answers.length > 0
  }

  async function validateSubmitButton() {
    const isValidDateSubmit = await validateDateSubmit();
    const isValidAnswers = isValidCheckboxes();
    if (!isValidDateSubmit) {
      setLabelButton('Time invalid')
    }
    const isValidSubmit = isValidDateSubmit && isValidAnswers
    setIsDisabledButton(!isValidSubmit)
  }

  useEffect(() => {
    async function getQuestions() {
      const questions = await QuizService.getQuestions(id);
      setQuestions(questions);
    }

    getQuestions()
    validateSubmitButton();
  }, [id]);

  async function getTransactionNonce(
    wallet: string,
    blockNumber: BlockNumber,
  ): Promise<number> {
    return await web3.eth.getTransactionCount(wallet, blockNumber);
  }

  async function sendOperation(privateKey: string, transaction: any): Promise<any> {
    const signer = web3.eth.accounts.privateKeyToAccount(privateKey);

    const walletOwner = signer.address;
    const nonce = await getTransactionNonce(walletOwner, 'pending');
    const options: TransactionConfig = {
      to: transaction._parent._address,
      data: transaction.encodeABI(),
      gas: await transaction.estimateGas({ from: walletOwner }),
      nonce,
      from: addressR,
    };
    const signed = await web3.eth.accounts.signTransaction(
      options,
      privateKey,
    );
    return web3.eth.sendSignedTransaction(signed.rawTransaction);
  }

  async function submitSurvey() {
    if (!isValidCheckboxes()) return;
    setOpen(true)
    setIsDisabledButton(true)
    try {
      const SurveyInstance = await new web3.eth.Contract(SurveyContract.abi, environment.tokenQuiz);
      const surveyId = web3.utils.toWei('1', 'ether')
      const transaction = SurveyInstance.methods.submit(surveyId, answers)
      const privateKey = process.env.REACT_APP_SIGNER_PRIVATE_KEY;
      const receipt = await sendOperation(privateKey || '', transaction);
      const isValidDateSubmit = await validateDateSubmit();
      setIsDisabledButton(!isValidDateSubmit)
      console.log(receipt)
      if (isSuccessfulTransaction(receipt)) {
        console.log('Success');
        setMessage({ show: true, text: 'Survey processed successfully' })
      }
      setOpen(false)
    } catch (e: any) {
      setMessage({ show: true, type: TypeAlert.error, text: `Error processing transaction ${e}` })
    }

  }

  async function onChangeCheckbox(i: number) {
    const newArray = [...answers, i];
    setAnswers(newArray)
    await validateSubmitButton()
  }

  return (
    <Fragment>
      <Message show={message.show} text={message.text} type={message.type}/>
      <ul>
        {questions.map((q, i) => {
          return (
            <ItemSurvey key={i} question={q.question} answers={q.answers} qTag={`q-${i}`}
                        onChangeCheckbox={onChangeCheckbox}/>
          )
        })
        }
      </ul>
      <div className="boxButton">
        <Button className="btnProcess"
                size="large"
                color="primary"
                variant="contained"
                startIcon={<SaveIcon/>}
                disabled={isDisabledButton}
                onClick={submitSurvey}
        >{labelButton}</Button>
      </div>
      <Loading open={open}/>
    </Fragment>
  )
}