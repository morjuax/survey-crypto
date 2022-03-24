import './Balance.scss';
import { Fragment, useEffect, useState } from 'react';
import { Chip, CircularProgress } from '@material-ui/core';
import Web3Provider from '../../providers/web3.provider';
import store from '../../config/storeCustom';
import { environment } from '../../enviroments/environment';

const SurveyContract = require(`../../abis/survey-abi.json`);
const web3 = Web3Provider.getWeb3WithProvider();

export default function Balance() {
  const [state, setState] = useState({
    balance: '0',
    name: '',
    loadingBalance: false
  });


  async function getBalanceWallet(): Promise<string> {
    const SurveyInstance = await new web3.eth.Contract(SurveyContract.abi, environment.tokenQuiz)
    const balanceDecimal = await SurveyInstance.methods.balanceOf(store.address).call()
    const balance = Number(web3.utils.fromWei(web3.utils.toBN(balanceDecimal), 'ether'));
    return balance.toFixed(4);
  }

  async function getSymbolToken(): Promise<any> {
    const SurveyInstance = await new web3.eth.Contract(SurveyContract.abi, environment.tokenQuiz)
    return SurveyInstance.methods.symbol().call();
  }

  useEffect(() => {
    (async () => {
      async function setData() {
        if (store.canPlay === 'true') {
          setState({ ...state, loadingBalance: true})
          const symbol = await getSymbolToken();
          const balance = await getBalanceWallet();
          setState({ ...state, name: symbol, balance, loadingBalance: false})
        }
      }
      await setData();
    })()
    // await setData();
  }, [])

  if (state.loadingBalance) return <CircularProgress color="secondary" />
  return (
    <Fragment>
      <Chip className='b' label={`${state.balance} ${state.name}`} />
    </Fragment>
  )
}