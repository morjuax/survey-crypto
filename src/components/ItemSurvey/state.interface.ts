export interface ItemAnswer {
  answer: string;
  checked: boolean;
}
export interface State {
  list: ItemAnswer[];
  answers: number[];
}