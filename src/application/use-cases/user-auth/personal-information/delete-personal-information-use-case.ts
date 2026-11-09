import { UserRepository } from "../../../../domain/repositories/user-repository";

interface DeletePersonalInformationInput {
    userId: number
}

export class DeleteUserPersonalInformationUseCase {

    constructor(
        private readonly userRepository: UserRepository
    ) {
    }

    async execute(input: DeletePersonalInformationInput) : Promise<boolean> {
        let result = await this.userRepository.deletePersonalInformation(input.userId)
        return result
    }
}