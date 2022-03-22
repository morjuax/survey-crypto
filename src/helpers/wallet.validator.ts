import web3 from 'web3';

export function isValidAddress(address: string | null): boolean {
  if (address) {
    return web3.utils.isAddress(address);
  }
  return false;
}

export function addressParsed(address: string) {
  const first = address.substr(0, 4);
  const last = address.substr(-5, 5);
  return address ? `${first}...${last}` : 'Connect Wallet';
}