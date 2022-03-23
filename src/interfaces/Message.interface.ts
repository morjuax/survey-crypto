import { TypeAlert } from '../enums/Alert.enum';

export default interface MessageInterface {
  text?: string;
  type?: TypeAlert;
  show: boolean;
}