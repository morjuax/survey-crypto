import './Cooldown.scss';
import { Fragment, useEffect, useState } from 'react';
import {  CircularProgress } from '@material-ui/core';
import moment from 'moment';
import SurveyContractService from '../../services/survey-contract.service';


export default function Cooldown() {
  const [timeValid, setTimeValid] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      async function setData() {
        setLoading(true);
        const seconds = await SurveyContractService.getCooldownSeconds();
        const lastSub = await SurveyContractService.getLastSubmittal();
        const timeValid = Number(lastSub) + Number(seconds);
        const timeValidFormatted = moment.unix(timeValid).format('DD-MM-YYYY HH:mm:ss').toString();
        setTimeValid(timeValidFormatted);
        setLoading(false);
      }

      await setData();
    })()
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