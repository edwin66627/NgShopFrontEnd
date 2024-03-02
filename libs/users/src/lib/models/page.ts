import { User } from "./user";

export class Page {
    content?: User[];
    last?: boolean;
    totalElements?: number;
    totalPages?: number;
    first?: boolean;
    empty?: boolean;
}