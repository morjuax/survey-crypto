const data = {
  needLogin: localStorage.getItem('needLogin'),
  isConnectedWithMetamask: () => localStorage.getItem('isConnectedWithMetamask'),
  setAddress: (address: string) => localStorage.setItem('address', address),
  setNeedLogin: (needLogin: string) => localStorage.setItem('needLogin', needLogin),
}

export default data;