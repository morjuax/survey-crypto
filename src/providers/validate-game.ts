// eslint-disable-next-line import/no-cycle
import Metamask from '../services/metamask';
import { isValidAddress } from '../helpers/wallet.validator';
import store from '../config/storeCustom';

class ValidateGame {
  async canPlay(): Promise<boolean> {
    const hasAccounts = await Metamask.getAccountCurrent();
    if (!hasAccounts) {
      store.setCanPlay('false');
      store.setNeedLogin('true');
      return false;
    }

    const address = store.getAddress;
    const hasPublicAddress = this.hasPublicAddress(address);
    if (!hasPublicAddress) {
      store.setCanPlay('false');
      return false;
    }

    if (!isValidAddress(address)) {
      store.setCanPlay('false');
      return false;
    }

    const isMetaMaskConnected = await Metamask.isMetaMaskConnected();
    if (!isMetaMaskConnected) {
      store.setIsConnectedWithMetamask('false')
      store.setCanPlay('false');
      return false;
    }

    store.setIsConnectedWithMetamask('true')
    store.setCanPlay('true');
    return true;
  }

  hasPublicAddress(publicAddress: string | null): boolean {
    return publicAddress !== null && publicAddress !== '';
  }
}
export default new ValidateGame();
