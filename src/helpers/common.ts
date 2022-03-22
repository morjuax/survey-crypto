// import { isProduction } from '@/helpers/utils';
// import networks from '../../networks';

import { Chain } from '../enums/chain.enum';
import networks from '../networks';

export function getValidChain() {
  return process.env.VUE_APP_VALID_CHAIN || Chain.ropsten;
}

export function getProviderUrl() {
  return networks.ropsten.provider.providerOrUrl;
}

export function getDatadogClientKey() {
  return process.env.VUE_APP_DATADOG_CLIENT_KEY || '';
}

export function getDatadogService() {
  return process.env.VUE_APP_DATADOG_SERVICE || '';
}

export function getPubKey() {
  return process.env.VUE_APP_PUB_KEY || '';
}
