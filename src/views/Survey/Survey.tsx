import './Survey.scss'
import { Fragment } from 'react';
import { Container } from '@material-ui/core';
import ListSurvey from '../../components/ListSurvey/ListSurvey';

interface Props {
  id: number;
}

export default function Survey(): JSX.Element {
  return (
    <Fragment>
      <Container maxWidth="lg" className="containerSuv">
        <ListSurvey/>
      </Container>
    </Fragment>
  )
}