import { Group } from "./IGroup.interface";
import { IUserRole } from "./IUserRole.interface";

interface IUserPayload {
    id: number;
    barcode: string;
    name: string;
    surname: string;
    imageId?: string;
    scores: number;
    role?: IUserRole;
    group?: Group;
}

export { IUserPayload };
