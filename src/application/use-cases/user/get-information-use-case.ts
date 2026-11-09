import { UserEntity } from "../../../domain/models/entities/user-entity";
import { UserRepository } from "../../../domain/repositories/user-repository";

interface GetInformationInput {
    userId: number;
}

export type GetInformationOutput = Omit<UserEntity, 'password' | 'personalInformation' | 'jobs' | 'passwordResetCode'>

export class GetInformationUseCase {

    constructor(
        private readonly userRepository: UserRepository
    ) {        
    }

    async execute(input: GetInformationInput) : Promise<GetInformationOutput> {
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