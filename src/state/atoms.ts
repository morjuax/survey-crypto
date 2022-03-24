import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist'
const { persistAtom } = recoilPersist()

export const addressState = atom({
  key: "addressState",
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const canPlayState = atom({
  key: "canPlayState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const shouldUpdateBalance = atom({
  key: "shouldUpdateBalance",
  default: true,
});

// export const shouldUpdateBalanceSelect = selector({
//   key: 'shouldUpdateBalanceSelect', // unique ID (with respect to other atoms/selectors)
//   get: ({get}) => {
//     return get(shouldUpdateBalance);
//   },
// });