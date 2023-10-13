import { NewBombDTO } from '../dtos/newProperty';

export interface BombDomain {
  newBomb: (params: NewBombDTO, token?: string) => Promise<any>;
  getBombs: (token?: string) => Promise<any>;
  deleteBomb: (id: number, token?: string) => Promise<any>;
}