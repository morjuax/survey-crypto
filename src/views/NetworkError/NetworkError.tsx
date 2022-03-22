import './NetworkError.scss'
import { Fragment } from 'react';
import { Button, Container } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

export default function NetworkError() {
  const navigate = useNavigate();

  function reload() {
    navigate("/");
  }

  return (
    <Fragment>
      <Container maxWidth="sm" className="containerTrivia">
        <div>
          <h1>A network mismatch was detected</h1>
          <p>To continue, please change the <b>Ropsten network</b> in your wallet and click "Reload"</p>
          <Button variant="contained" onClick={reload}>RELOAD</Button>
        </div>
      </Container>
    </Fragment>
  )
}