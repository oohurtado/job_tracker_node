import es from "zod/v4/locales/es.js";
import { prisma } from "../../_lib/prisma";
import { UserEntity } from "../../domain/models/entities/user-entity";
import { UserPersonalInformationReadModel } from "../../domain/models/read-models/user/user-personal-information-read-model";
import { UserRepository } from "../../domain/repositories/user-repository";

export class UserRepositoryImpl implements UserRepository {
            
    async register(email: string, password: string, firstName: string, lastName: string) : Promise<UserEntity> {
        let result = await prisma.user.create({
            data: {
                email: email,
                password: password,
                first_name: firstName,
                last_name: lastName,                
            }
        });

        return new UserEntity(
            result.id, 
            result.email,          
            result.password,   
            result.first_name, 
            result.last_name, 
            result.created_at,
            result.password_reset_code);
    };
        
    async getByEmail(email: string) : Promise<UserEntity | null> {
        let result = await prisma.user.findUnique({
            where: { email: email },
            select: {
                id: true,
                password: true,
                email: true,
                first_name: true,
                last_name: true,
                created_at: true,
                password_reset_code: true
            }
        })

        if (result === null) {
            throw new Error("No se encontró el correo electrónico");
        }

        return new UserEntity(
            result.id, 
            result.email,          
            result.password,   
            result.first_name, 
            result.last_name, 
            result.created_at,
            result.password_reset_code);
    }

    async getById(id: number): Promise<UserEntity | null> {
        let result = await prisma.user.findUnique({
            where: { id: id },
            select: {
                id: true,
                password: true,
                email: true,
                first_name: true,
                last_name: true,
                created_at: true,
                password_reset_code: true
            }
        })

        if (result === null) {
            throw new Error("No se encontró el correo electrónico");
        }

        return new UserEntity(
            result.id, 
            result.email,          
            result.password,   
            result.first_name, 
            result.last_name, 
            result.created_at,
            result.password_reset_code);
    }    

    async getPaginated (pageNumber: number, pageSize: number, sortBy: string, sortOrder: string) : Promise<UserEntity[]> {
        const skipRows = (pageNumber - 1) * pageSize;
        
        const users = await prisma.user.findMany({
            skip: skipRows,
            take: pageSize,
            orderBy: {                
                [sortBy]: sortOrder
            }
        });

        return users.map(u =>
            new UserEntity(
                u.id,
                u.email,
                u.password,
                u.first_name,
                u.last_name,
                u.created_at,
                u.password_reset_code)
        );
    };

    async changePassword (userId: number, newPassword: string) : Promise<void> {
        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                password: newPassword
            }
        })        
    };

    async forgotPasswordSaveCode(email: string, code: string): Promise<void> {
        await prisma.user.update({
            where: {
                email: email
            },
            data: {
                password_reset_code: code
            }
        })        
    }

    async forgotPasswordApplyCode(email: string, code: string, newPassword: string): Promise<boolean> {
        try {
            await prisma.user.update({
                where: {
                    email: email,
                    password_reset_code: code                
                },
                data: {
                    password: newPassword,
                    password_reset_code: null
                },
            })
        } catch (error) {
            return false;
        }

        return true;
    }

    async deletePersonalInformation(userId: number): Promise<boolean> {
        try {
            await prisma.personalInformation.delete({
                where: {
                    user_id: userId
                }
            })
        } catch (error) {
            return false
        }

        return true
    }

    async getPersonalInformation(userId: number): Promise<UserPersonalInformationReadModel | null> {
        let result = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                first_name: true,
                last_name: true,
                email: true,
                created_at: true,
                personal_information: {
                    select: {
                        birth_country: true,
                        birth_date: true,
                        birth_state: true,                        
                    }
                }
            }
        })

        if (result === null) {
            return null
        }

        return new UserPersonalInformationReadModel(
            result.first_name,
            result.last_name,
            result.email,
            result.created_at,
            result.personal_information?.birth_country ?? null,                        
            result.personal_information?.birth_state ?? null,
            result.personal_information?.birth_date ?? null
        )
    }

    async updatePersonalInformation(
        userId: number, 
        user: { firstName: string; lastName: string; }, 
        personalInformation: { birthDate: Date; birthCountry: string | null; birthState: string | null; }
    ): Promise<void> {
        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                first_name: user.firstName,
                last_name: user.lastName,
            }
        })

        await prisma.personalInformation.upsert({
            where: {
                user_id: userId
            },
            create: {
                birth_date: new Date(personalInformation.birthDate ?? ''),
                birth_country: personalInformation.birthCountry,
                birth_state: personalInformation.birthState,
                user_id: userId
            },
            update: {
                birth_date: personalInformation.birthDate,
                birth_country: personalInformation.birthCountry,
                birth_state: personalInformation.birthState,
                user_id: userId
            }
        })
    }

}
