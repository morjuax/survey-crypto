import './BtnMetamask.scss';
import { Button } from '@material-ui/core';
import { Fragment, useEffect, useState } from 'react';
import logoMetamask from '../../assets/icons/metamask-fox.svg'
import Metamask from '../../services/metamask';
import store from '../../config/storeCustom'
import Web3Provider from '../../providers/web3.provider';
import ValidateGame from '../../providers/validate-game';
import { addressParsed } from '../../helpers/wallet.validator';
import { useRecoilState } from 'recoil';
import { addressState, shouldUpdateBalance } from '../../state/atoms';

declare let window: any;

export default function BtnMetamask() {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [address, setAddress] = useState<string>('');
  const [shouldUpdateB, setShouldUpdateB] = useRecoilState(shouldUpdateBalance);
  const [addressR, setAddressR] = useRecoilState(addressState);

  async function validateConnection() {
    const isConnected = await Metamask.isMetaMaskConnected();
    const address = await Metamask.getAccountCurrent();
    setIsConnected(isConnected);
    setAddress(addressParsed(address));
  }

  useEffect(() => {
    (async () => {
      await validateConnection()
    })();
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
    setAddressR(address)
    store.setNeedLogin('false');

    const canPlay = await ValidateGame.canPlay();

    if (canPlay) {
      await validateConnection();
      await Metamask.validateChainCurrent();
      setShouldUpdateB(true);
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