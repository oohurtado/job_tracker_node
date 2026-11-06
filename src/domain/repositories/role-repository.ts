import { RoleEntity } from "../models/entities/role-entity";

export interface RoleRepository {

    // add a role to a user
    addRoleToUser(userId: number, roleName: string) : Promise<void>;

    // remove a role from a user
    removeRoleFromUser(userId: number, roleName: string) : Promise<void>;

    // get roles of a user
    getByUserId(userId: number) : Promise<RoleEntity[]>;
}