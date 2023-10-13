import { NewCultureDTO } from '../dtos/culture';

export interface CultureDomain {
  newCulture: (params: NewCultureDTO, token?: string) => Promise<any>;
  getCultures: (token?: string) => Promise<any>;
  deleteCulture: (id: number, token?: string) => Promise<any>;
  getCulturesData: (token?: string) => Promise<any>;
  editCulture: (params: any, id: number, token?: string) => Promise<any>;
}