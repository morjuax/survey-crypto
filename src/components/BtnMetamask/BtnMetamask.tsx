import './BtnMetamask.scss';
import { Button } from '@material-ui/core';
import { Fragment, useEffect, useState } from 'react';
import logoMetamask from '../../assets/icons/metamask-fox.svg'
import Metamask from '../../services/metamask';
import store from '../../config/storeCustom'
import Web3Provider from '../../providers/web3.provider';
import ValidateGame from '../../providers/validate-game';
import { addressParsed } from '../../helpers/wallet.validator';

declare let window: any;

export default function BtnMetamask() {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [address, setAddress] = useState<string>('');

  useEffect(() => {
    (async () => {
      const isConnected = await Metamask.isMetaMaskConnected();
      setIsConnected(isConnected);
    })();
    setAddress(addressParsed(store.getAddress));
  }, [])

  async function connectToMeta() {
    if (window.ethereum) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    }
  }

  async function upMetamaskLogin() {
    if (!store.needLogin && store.isConnectedWithMetamask) return;

    await connectToMeta();

    const web3 = await Web3Provider.getWeb3();
    const coinBase = await web3.eth.getCoinbase();

    if (!coinBase) {
      alert('Please activate Metamask first.')
      return;
    }

    const address = coinBase.toLowerCase();
    store.setAddress(address);
    store.setNeedLogin('false');

    const canPlay = await ValidateGame.canPlay();

    if (canPlay) {
      await Metamask.validateChainCurrent();
    }
  }

  return (
    <Fragment>
      <Button className="btnMeta" onClick={upMetamaskLogin}>
        <img src={logoMetamask} className="logoMetamask" alt="logo-meta"/>
        <span>
          {isConnected ? address : 'Connect Wallet'}
        </span>
      </Button>
    </Fragment>
  )
}