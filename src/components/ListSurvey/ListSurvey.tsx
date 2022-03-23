import './ListSurvey.scss'
import { Fragment, useEffect, useState } from 'react';
import QuizService from '../../services/quiz.service';
import { Question } from '../../interfaces/quiz.inteface';
import ItemSurvey from '../ItemSurvey/ItemSurvey';
import { Backdrop, Button, CircularProgress, createStyles, makeStyles, Theme } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import Web3Provider from '../../providers/web3.provider';
import { environment } from '../../enviroments/environment';
import store from '../../config/storeCustom';
import { isSuccessfulTransaction } from '../../helpers/confirm';
import { BlockNumber } from 'web3-core';
import { getTimestampNowUtc } from '../../helpers/utils';
import Loading from '../Loading/Loading';

interface Props {
  id?: number;
}

const SurveyContract = require(`../../abis/survey-abi.json`);
const web3 = Web3Provider.getWeb3WithProvider();

export default function ListSurvey({id}: Props) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isDisabledButton, setIsDisabledButton] = useState<boolean>(true);
  const [labelButton, setLabelButton] = useState<string>('Finalize Quiz');
  const [open, setOpen] = useState(false);

  async function getCooldownSeconds(): Promise<any> {
    const SurveyInstance = await new web3.eth.Contract(SurveyContract.abi, environment.tokenQuiz)
    return SurveyInstance.methods.cooldownSeconds().call();
  }

  async function getLastSubmittal(): Promise<any> {
    const SurveyInstance = await new web3.eth.Contract(SurveyContract.abi, environment.tokenQuiz)
    const address = store.getAddress;
    return SurveyInstance.methods.lastSubmittal(address).call();
  }

  async function validateDateSubmit(): Promise<boolean> {
    const cooldown = await getCooldownSeconds()
    const lastSubmittal = await getLastSubmittal();
    const now = getTimestampNowUtc();
    return now > (Number(lastSubmittal) + Number(cooldown))
  }


  useEffect(() => {
    async function getQuestions() {
      const questions = await QuizService.getQuestions(id);
      setQuestions(questions);
    }

    async function validateSubmitButton() {
      const isValidDateSubmit = await validateDateSubmit();
      if (!isValidDateSubmit) {
        setLabelButton('Time invalid')
      }
      setIsDisabledButton(!isValidDateSubmit)
    }

    getQuestions()
    validateSubmitButton();
  }, []);

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
    const options = {
      to: transaction._parent._address,
      data: transaction.encodeABI(),
      gas: await transaction.estimateGas({ from: walletOwner }),
      nonce,
    };
    const signed = await web3.eth.accounts.signTransaction(
      options,
      privateKey,
    );
    return web3.eth.sendSignedTransaction(signed.rawTransaction);
  }

  async function submitSurvey() {
    setOpen(true)
    setIsDisabledButton(true)
    const SurveyInstance = await new web3.eth.Contract(SurveyContract.abi, environment.tokenQuiz);
    const surveyId = web3.utils.toWei('1', 'ether')
    const transaction = SurveyInstance.methods.submit(surveyId, [1,2,3,4,5,6])
    const privateKey = process.env.REACT_APP_SIGNER_PRIVATE_KEY;
    const receipt = await sendOperation(privateKey || '', transaction);
    const isValidDateSubmit = await validateDateSubmit();
    setIsDisabledButton(!isValidDateSubmit)
    console.log(receipt)
    if (isSuccessfulTransaction(receipt)) {
      console.log('Success');
    }
    setOpen(false)
  }

  return (
    <Fragment>
      <h4>{}</h4>
      <ul>
        {questions.map((q, i) => {
          return (
            <ItemSurvey key={i} question={q.question} answers={q.answers} qTag={`q-${i}`}/>
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
                disabled={isDisabledButton}
                onClick={submitSurvey}
        >{labelButton}</Button>
      </div>
      <Loading open={open}/>
    </Fragment>
  )
}