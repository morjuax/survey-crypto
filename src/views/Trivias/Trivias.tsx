import {
  Container,
  Grid,
} from '@material-ui/core';
import { Fragment, useEffect, useState } from 'react';
import { Trivia } from '../../interfaces/quiz.inteface';
import TriviaService from '../../services/trivia.service';
import TriviaBox from '../../components/TriviaBox/TriviaBox';

export default function Trivias() {
  const [trivias, setTrivias] = useState<Trivia[]>([]);

  useEffect(() => {
    async function getTrivias() {
      const data = await TriviaService.getAll();
      setTrivias(data);
    }
    getTrivias()
  }, [trivias]);

  return (
    <Fragment>
      <Container maxWidth="lg" className="containerTrivia">
        <h1>Daily Trivia</h1>
        <Grid container spacing={3}>
          {trivias.map((item, i) => {
            return (
              <Grid key={i} item xs={6} sm={3}>
                <TriviaBox id={item.id} name={item.name} image={item.image}/>
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </Fragment>
  )
}