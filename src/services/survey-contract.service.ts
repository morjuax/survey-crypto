import { environment } from '../enviroments/environment';
import store from '../config/storeCustom';
import Web3Provider from '../providers/web3.provider';

const SurveyContract = require(`../abis/survey-abi.json`);
const web3 = Web3Provider.getWeb3WithProvider();

class SurveyContractService {
  async getCooldownSeconds(): Promise<any> {
    const SurveyInstance = await new web3.eth.Contract(SurveyContract.abi, environment.tokenQuiz)
    return SurveyInstance.methods.cooldownSeconds().call();
  }

  async getLastSubmittal(): Promise<any> {
    const SurveyInstance = await new web3.eth.Contract(SurveyContract.abi, environment.tokenQuiz)
    const address = store.getAddress;
    return SurveyInstance.methods.lastSubmittal(address).call();
  }
}

export default new SurveyContractService();
