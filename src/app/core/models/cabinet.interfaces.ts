export interface CabinetResponseInterface {
    publicId: string;
    number: string;
    type: string;
    maxStudents: number;
}

export interface CabinetDto extends CabinetResponseInterface{
  buildingName: string;
  buildingId: string;
}
