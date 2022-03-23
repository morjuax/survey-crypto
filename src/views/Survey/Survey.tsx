import './Survey.scss'
import { Fragment } from 'react';
import { Container, Grid } from '@material-ui/core';
import ListSurvey from '../../components/ListSurvey/ListSurvey';
import Cooldown from '../../components/Cooldown/Cooldown';

// interface Props {
//   id: number;
// }

export default function Survey(): JSX.Element {
  return (
    <Fragment>
      <Container maxWidth="lg" className="containerSuv">
        <Grid container spacing={3}>
          <Grid item xs={6}>Title</Grid>
          <Grid item xs={6}><Cooldown/></Grid>
        </Grid>
        <ListSurvey/>
      </Container>
    </Fragment>
  )
}