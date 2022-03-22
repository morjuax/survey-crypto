export interface DefaultLogin {
  needLogin: boolean;
  isConnectedWithMetamask: boolean;
}

export interface DefaultGlobal {
  login: DefaultLogin,
}