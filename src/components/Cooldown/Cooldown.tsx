import './Cooldown.scss';
import { Fragment, useEffect, useState } from 'react';
import { Chip, CircularProgress } from '@material-ui/core';
import Web3Provider from '../../providers/web3.provider';
import { environment } from '../../enviroments/environment';
import store from '../../config/storeCustom';
import { getTimestampNowUtc } from '../../helpers/utils';
import moment from 'moment';

const SurveyContract = require(`../../abis/survey-abi.json`);
const web3 = Web3Provider.getWeb3WithProvider();

export default function Cooldown() {
  const [seconds, setSeconds] = useState<string>('');
  const [lastSub, setLastSub] = useState<string>('');
  const [timeValid, setTimeValid] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

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
        setLoading(true);
        const seconds = await getCooldownSeconds();
        setSeconds(seconds);
        const lastSub = await getLastSubmittal();
        setLastSub(lastSub);
        const timeValid = Number(lastSub) + Number(seconds);
        const timeValidFormatted = moment.unix(timeValid).format('DD-MM-YYYY HH:mm:ss').toString();
        setTimeValid(timeValidFormatted);
        setLoading(false);
      }

      await setData();
    })()
    // await setData();
  }, [])

  if (loading) return <CircularProgress color="secondary" />

  return (
    <Fragment>
      <div>
        <span> Next time valid <b>{timeValid}</b></span>
      </div>
    </Fragment>
  )
}