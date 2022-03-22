import Web3 from 'web3';
// import message from '@/helpers/message';
// import { TypeSnackbar } from '@/enums/utils.enums';
// import { getProviderUrl } from '@/helpers/common';

declare let window: any;

class Web3Provider {
  getWeb3(): any {
    debugger;
    if (window.ethereum) {
      return new Web3(window.ethereum);
    }
    // if (window.web3) {
    //   return new Web3(window.web3.currentProvider);
    // }
    // message.show('You need to allow Metamask.', TypeSnackbar.info);
    return null;
  }
}

export default new Web3Provider();
