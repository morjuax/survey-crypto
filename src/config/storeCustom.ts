const data = {
  address: localStorage.getItem('address') || '',
  needLogin: localStorage.getItem('needLogin'),
  isConnectedWithMetamask: localStorage.getItem('isConnectedWithMetamask'),
  canPlay: localStorage.getItem('canPlay'),
  setAddress: (address: string) => localStorage.setItem('address', address),
  setNeedLogin: (needLogin: string) => localStorage.setItem('needLogin', needLogin),
  setCanPlay: (canPlay: string) => localStorage.setItem('canPlay', canPlay),
  setIsConnectedWithMetamask: (isConnected: string) => localStorage.setItem('isConnectedWithMetamask', isConnected),
}

export default data;