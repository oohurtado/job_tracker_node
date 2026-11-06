import { prisma } from "../../_lib/prisma";
import { RoleEntity } from "../../domain/models/entities/role-entity";
import { RoleRepository } from "../../domain/repositories/role-repository";

export class RoleRepositoryImpl implements RoleRepository {
    
    async addRoleToUser(userId: number, roleName: string): Promise<void> {
        await prisma.role.create({
            data: {
                name: roleName,
                user_id: userId
            }
        });                      
    }

    async removeRoleFromUser(userId: number, roleName: string): Promise<void> {
        await prisma.role.delete({
            where: {
                user_id_name: {
                    user_id: userId,
                    name: roleName
                }
            }
        });
    }

    async getByUserId(userId: number): Promise<RoleEntity[]> {
        let result = await prisma.role.findMany({
            where: {
                user_id: userId
            }
        });
        
        return result.map(role => new RoleEntity(
            role.id, 
            role.name, 
            role.user_id));
    }

}