import './Cooldown.scss';
import { Fragment, useEffect, useState } from 'react';
import { Chip } from '@material-ui/core';
import Web3Provider from '../../providers/web3.provider';
import { environment } from '../../enviroments/environment';
import store from '../../config/storeCustom';

const SurveyContract = require(`../../abis/survey-abi.json`);
const web3 = Web3Provider.getWeb3WithProvider();

export default function Cooldown() {
  const [seconds, setSeconds] = useState<string>('');

  async function getCooldownSeconds(): Promise<any> {
    const SurveyInstance = await new web3.eth.Contract(SurveyContract.abi, environment.tokenQuiz)
    return SurveyInstance.methods.cooldownSeconds().call();
  }

  async function getLastSubmittal(): Promise<any> {
    const SurveyInstance = await new web3.eth.Contract(SurveyContract.abi, environment.tokenQuiz)
    const address = store.getAddress;
    return SurveyInstance.methods.lastSubmittal(address).call();
  }

  useEffect(() => {
    (async () => {
      async function setData() {
        const seconds = await getCooldownSeconds();
        setSeconds(seconds);
        const lastSub = await getLastSubmittal();
        console.log('lastSub', lastSub)
      }
      await setData();
    })()
    // await setData();
  }, [])

  return (
    <Fragment>
      <Chip className='b' label={`${seconds} seg`} />
    </Fragment>
  )
}