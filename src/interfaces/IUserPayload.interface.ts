import { IUserRole } from "./IUserRole.interface";

export interface IUserPayload {
  id: number;
  barcode: string;
  name: string;
  surname: string;
  imageId: string;
}
