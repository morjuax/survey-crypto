import './BtnMetamask.scss';
import { Button } from '@material-ui/core';
import { Fragment, useEffect, useState } from 'react';
import logoMetamask from '../../assets/icons/metamask-fox.svg'
import Metamask from '../../helpers/metamask';
import store from '../../config/storeCustom'
import Web3Provider from '../../providers/web3.provider';

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

  async function upMetamaskLogin() {
    if (!store.needLogin && store.isConnectedWithMetamask) return;

    await connectToMeta();

    const web3 = await Web3Provider.getWeb3();
    // const coinBase = await web3.eth.getCoinbase();
    //
    // if (!coinBase) {
    //   alert('Please activate Metamask first.')
    //   return;
    // }
    //
    // const address = coinBase.toLowerCase();
    // store.setAddress(address);
    // store.setNeedLogin('false');
  }

  return (
    <Fragment>
      <Button className="btnMeta" onClick={upMetamaskLogin}>
        <img src={logoMetamask} className="logoMetamask" alt="logo-meta"/>
        <span>
          Connect Wallet
        </span>
      </Button>
    </Fragment>
  )
}