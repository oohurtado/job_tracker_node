import { UserEntity } from "../../../domain/models/entities/user-entity";
import { UserRepository } from "../../../domain/repositories/user-repository";

interface GetMeInput {
    userId: number;
}

export type GetMeOutput = Omit<UserEntity, 'password' | 'personalInformation' | 'jobs' | 'passwordResetCode'>

export class GetMeUseCase {

    constructor(
        private readonly userRepository: UserRepository
    ) {        
    }

    async execute(input: GetMeInput) : Promise<GetMeOutput> {
        let result = await this.userRepository.getById(input.userId)
        if (!result) {
            throw new Error("Usuario no encontrado");
        }   

        const {
            password,
            personalInformation,
            jobs,
            passwordResetCode,
            ...user
        } = result;

        return user;
    }
}