import Web3 from 'web3';
import { getProviderUrl } from '../helpers/common';
// import message from '@/helpers/message';
// import { TypeSnackbar } from '@/enums/utils.enums';
// import { getProviderUrl } from '@/helpers/common';

declare let window: any;

class Web3Provider {
  getWeb3WithProvider(): any {
    const provider = getProviderUrl();
    try {
      if (window.ethereum) {
        return new Web3(provider);
      }
      if (window.web3) {
        return new Web3(provider);
      }
      // message.show('You need to allow Metamask.', TypeSnackbar.info);
      alert('You need to allow Metamask.');
      return null;
    } catch (error) {
      // message.show('You need to allow Metamask.', TypeSnackbar.info);
      console.error('You need to allow Metamask.');
      throw error;
    }
  }

  getWeb3(): any {
    if (window.ethereum) {
      return new Web3(window.ethereum);
    }
    if (window.web3) {
      return new Web3(window.web3.currentProvider);
    }
    // message.show('You need to allow Metamask.', TypeSnackbar.info);
    return null;
  }
}

export default new Web3Provider();
