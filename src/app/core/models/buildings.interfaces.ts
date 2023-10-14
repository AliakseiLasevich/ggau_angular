import { CabinetResponseInterface } from './cabinet.interfaces';

export interface BuildingResponseInterface {
  publicId: string;
  name: string;
  cabinets: CabinetResponseInterface[];
}

export interface BuildingRequestInterface {
  publicId: string | null;
  name: string;
}
