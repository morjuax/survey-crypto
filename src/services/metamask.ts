import { getValidChain } from '../helpers/common';
import store from '../config/storeCustom';
import { MetamaskEvent } from '../enums/metamask.enums';

declare let window: any;

class Metamask {
  private ethereum: any;

  constructor() {
    this.getEthereum();
  }

  async getAccountCurrent() {
    const accounts = await this.ethereum.request({ method: 'eth_accounts' });
    return accounts[0];
  }

  async isMetaMaskConnected(): Promise<boolean> {
    try {
      if (this.ethereum) {
        const accounts = await this.ethereum.request({ method: 'eth_accounts' });
        return accounts > 0;
      }
      console.log('Please connect to Metamask.');
      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  getEthereum() {
    if (window.ethereum) {
      this.ethereum = window.ethereum;
    } else {
      console.log('Please connect to Metamask.')
    }
  }

  validateChainChanged(chainId: string): void {
    if (chainId === getValidChain()) {
      store.setCanPlay('true');
    } else {
      store.setCanPlay('false');
      window.location.href = '/network-error';
      console.log('validateChainChanged', chainId)
    }
  }

  async validateChainCurrent() {
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    console.log('chainId', chainId)
    this.validateChainChanged(chainId);
  }

  async validateChain(): Promise<boolean> {
    if (this.ethereum) {
      await this.validateChainCurrent()
      window.ethereum.on('chainChanged', this.validateChainChanged);
      return true;
    }
    console.log('Please connect to Metamask.')
    return false;
  }

  eventHandlerDisconnectCustom() {
    window.ethereum.on(MetamaskEvent.accountsChanged, async (accounts: string[]) => {
      if (accounts.length === 0) {
        // removeDataSession();
        store.setAddress('')
        store.setCanPlay('false')
        store.setIsConnectedWithMetamask('false')
        // Router.push({ name: 'login' }).catch((err) => err)
        return;
      }
      store.setCanPlay('true')
    });
  }
}

export default new Metamask()