import { NewPropertyDTO } from '../dtos/newProperty';

export interface NewPropertyDomain {
  newProperty: (params: NewPropertyDTO, token?: string) => Promise<any>;
  getProperties: (token?: string) => Promise<any>;
  getAllPropertiesData: (token?: string) => Promise<any>;
  getAllPropertiesItems: (token?: string) => Promise<any>;
  deleteProperty: (id: number, token?: string) => Promise<any>;
  getAllCalcCulture: (token?: string) => Promise<any>;
  editProperty: (params: any, id: number, token?: string) => Promise<any>;
}