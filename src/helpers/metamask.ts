import { getValidChain } from './common';

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
      // store.commit('CAN_PLAY', true);
      // message.hide();
    } else {
      // store.commit('CAN_PLAY', false);
      // message.showStatic('Invalid network, you need the BSC network', TypeSnackbar.warning);
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
}

export default new Metamask()