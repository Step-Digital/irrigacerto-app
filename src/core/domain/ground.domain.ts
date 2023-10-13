import { NewGroundDTO } from '../dtos/newProperty';

export interface GroundDomain {
  newGround: (params: NewGroundDTO, token?: string) => Promise<any>;
  getGrounds: (token?: string) => Promise<any>;
  deleteGround: (id: number, token?: string) => Promise<any>;
  editGround: (params: any, id: number, token?: string) => Promise<any>;
}