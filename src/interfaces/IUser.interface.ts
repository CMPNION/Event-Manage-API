import { Group } from "./IGroup.interface";
import { Role } from "./IRole.interface";

interface User {
  id: number;
  barcode: string;
  name: string;
  surname: string;
  imageId?: string;
  scores: number;
  role?: Role;
  group?: Group;
}

export { User };
