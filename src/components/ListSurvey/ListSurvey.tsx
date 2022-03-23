import './ListSurvey.scss'
import { Fragment, useEffect, useState } from 'react';
import QuizService from '../../services/quiz.service';
import { Question } from '../../interfaces/quiz.inteface';
import ItemSurvey from '../ItemSurvey/ItemSurvey';
import { Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import Web3Provider from '../../providers/web3.provider';
import { environment } from '../../enviroments/environment';
import store from '../../config/storeCustom';
import { isSuccessfulTransaction } from '../../helpers/confirm';
import { BlockNumber } from 'web3-core';

interface Props {
  id?: number;
}

const SurveyContract = require(`../../abis/survey-abi.json`);
const web3 = Web3Provider.getWeb3WithProvider();

export default function ListSurvey({id}: Props) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isDisabledButton, setIsDisabledButton] = useState<boolean>(false);
  const [isApprovedContract, setIsApprovedContract] = useState<boolean>(false);
  const [allow, setAllow] = useState<any>(0);

  async function allowanceContract() {
    const address = store.getAddress;
    const SurveyInstance = await new web3.eth.Contract(SurveyContract.abi, environment.tokenQuiz);
    const allow = await SurveyInstance.methods.allowance(address, environment.tokenQuiz).call();
    setAllow(allow);
  }

  async function approveContract() {
    const address = store.getAddress;

    const SurveyInstance = await new web3.eth.Contract(SurveyContract.abi, environment.tokenQuiz);
    return SurveyInstance.methods.approve(environment.tokenQuiz, web3.utils.toWei('5000000', 'ether'))
      .send({ from: address })
      .then(async (receipt: any) => {
        console.log('mined');
        if (receipt && receipt.status) {
          setIsApprovedContract(true)
        }
      }).catch(async (revertReason: any) => {
        console.log(revertReason)
        await getRevertReason(revertReason.receipt.transactionHash);
      });
  }


  useEffect(() => {
    async function getQuestions() {
      const questions = await QuizService.getQuestions(1);
      setQuestions(questions);
    }

    async function verifyContract() {
      await allowanceContract()
      if (Number(web3.utils.fromWei(web3.utils.toBN(allow), 'ether')) < Number(1)) {
        await approveContract();
        setIsApprovedContract( false)
      } else {
        setIsApprovedContract( true)
      }
    }

    // verifyContract()
    getQuestions()
  }, []);

  async function getRevertReason(txHash: string) {
    const tx = await web3.eth.getTransaction(txHash)
    await web3.eth
      .call(tx)
      .then(() => {
        throw Error('unlikely to happen')
      })
      .catch((revertReason: string) => {
        console.log(revertReason)
      });
  }

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
    const SurveyInstance = await new web3.eth.Contract(SurveyContract.abi, environment.tokenQuiz);
    // const address = store.getAddress;
    const surveryId = web3.utils.toWei('1', 'ether')
    const transaction = SurveyInstance.methods.submit(surveryId, [1,2,3,4,5,6])
    const privateKey = process.env.REACT_APP_SIGNER_PRIVATE_KEY;
    const receipt = await sendOperation(privateKey || '', transaction);
    console.log(receipt)
  }

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
                disabled={isDisabledButton}
                onClick={submitSurvey}
        >Finalize Quiz</Button>
      </div>
    </Fragment>
  )
}