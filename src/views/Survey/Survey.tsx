import './Survey.scss'
import { Fragment } from 'react';
import { Container } from '@material-ui/core';
import ListSurvey from '../../components/ListSurvey/ListSurvey';
import { useParams } from 'react-router-dom'
import SubBar from '../../components/SubBar/SubBar';

export default function Survey(): JSX.Element {
  const params = useParams();
  const triviaId = Number(params.triviaId)
  return (
    <Fragment>
      <Container maxWidth="lg" className="containerSuv">
        <SubBar title={'Quiz'}/>
        <ListSurvey id={triviaId}/>
      </Container>
    </Fragment>
  )
}