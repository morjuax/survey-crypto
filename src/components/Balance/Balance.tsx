import './Balance.scss';
import { Fragment, useEffect, useState } from 'react';
import { Chip } from '@material-ui/core';
import Web3Provider from '../../providers/web3.provider';
import store from '../../config/storeCustom';
import { environment } from '../../enviroments/environment';

const SurveyContract = require(`../../abis/survey-abi.json`);
const web3 = Web3Provider.getWeb3WithProvider();

export default function Balance() {
  const [balance, setBalance] = useState<string>('0');
  const [name, setName] = useState<string>('');

  async function getBalanceWallet(): Promise<string> {
    const Paradise = await new web3.eth.Contract(SurveyContract.abi, environment.tokenQuiz)
    const balanceDecimal = await Paradise.methods.balanceOf(store.getAddress).call()
    const balance = Number(web3.utils.fromWei(web3.utils.toBN(balanceDecimal), 'ether'));
    return balance.toFixed(4);
  }

  async function getSymbolToken(): Promise<any> {
    const Paradise = await new web3.eth.Contract(SurveyContract.abi, environment.tokenQuiz)
    return Paradise.methods.symbol().call();
  }



  useEffect(() => {
    (async () => {
      async function setData() {
        const symbol = await getSymbolToken();
        const balance = await getBalanceWallet();
        setName(symbol);
        setBalance(balance)
      }
      await setData();
    })()
    // await setData();
  }, [])

  return (
    <Fragment>
      <Chip className='b' label={`${balance} ${name}`} />
    </Fragment>
  )
}