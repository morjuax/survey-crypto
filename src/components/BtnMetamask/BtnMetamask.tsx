import './BtnMetamask.scss';
import { Button } from '@material-ui/core';
import { Fragment, useEffect, useState } from 'react';
import logoMetamask from '../../assets/icons/metamask-fox.svg'
import Metamask from '../../helpers/metamask';

declare let window: any;

export default function BtnMetamask() {
  const [accounts, setAccounts] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const isConnected = await Metamask.isMetaMaskConnected();
      setIsConnected(isConnected);
    })();
    console.log(isConnected)
  })

  async function connectToMeta() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccounts(accounts)
    }
  }
  return (
    <Fragment>
      <Button className="btnMeta" onClick={connectToMeta}>
        <img src={logoMetamask} className="logoMetamask" alt="logo-meta"/>
        <span>
          Connect Wallet
        </span>
      </Button>
    </Fragment>
  )
}