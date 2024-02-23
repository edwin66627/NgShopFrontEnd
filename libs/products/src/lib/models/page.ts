import { Product } from "./product";

export class Page {
    content?: Product[];
    last?: boolean;
    totalElements?: number;
    totalPages?: number;
    first?: boolean;
    empty?: boolean;
}