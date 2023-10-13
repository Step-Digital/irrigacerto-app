import { SystemInfoDTO } from '../dtos/newProperty';

export interface IrrigationSystemDomain {
  newIrrigationSystem: (params: SystemInfoDTO, token?: string) => Promise<any>;
  getSystems: (token?: string) => Promise<any>;
  deleteSystem: (id: number, token?: string) => Promise<any>;
}