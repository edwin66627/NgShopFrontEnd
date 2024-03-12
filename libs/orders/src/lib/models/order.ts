import { Address, User } from '@mycompany/users';
import { OrderItem } from "./order-item";

export class Order {
    id?: number;
    status?: string;
    totalPrice?: number;
    orderDate?: string;
    user?: User;
    orderItems?: OrderItem[];
    address?: Address[];
}