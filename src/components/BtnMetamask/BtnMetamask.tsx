import './BtnMetamask.scss';
import { Button } from '@material-ui/core';
import { Fragment } from 'react';
import logoMetamask from '../../assets/icons/metamask-fox.svg'

export default function BtnMetamask() {
  return (
    <Fragment>
      <Button className="btnMeta">
        <img src={logoMetamask} className="logoMetamask" alt="logo-meta"/>
        <span>
          Connect Wallet
        </span>
      </Button>
    </Fragment>
  )
}