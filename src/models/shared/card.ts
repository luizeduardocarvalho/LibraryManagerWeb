import { ICardButton } from './card-button';

export interface ICard {
  id: string;
  name: string;
  bodyContent: string[];
  buttons: ICardButton[];
}
