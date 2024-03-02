import { Address } from "./address";
import { Role } from "./role";

export class User {
    id?: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    roles?: Role[];
    email?: string;
    phone?: string;
    password?: string;
    addresses?: Address[] = [];
    emailVerified?: boolean;
    accountNonLocked?: boolean;
    credentialsNonExpired?: boolean;
    enabled?: boolean;
}
