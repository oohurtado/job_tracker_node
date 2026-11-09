import { UserPersonalInformationReadModel } from "../../../../domain/models/read-models/user/user-personal-information-read-model";
import { UserRepository } from "../../../../domain/repositories/user-repository";

interface GetPersonalInformationInput {
    userId: number
}

export class GetUserPersonalInformationUseCase {

    constructor(
        private readonly userRepository: UserRepository
    ) {        
    }

    async execute(input: GetPersonalInformationInput) : Promise<UserPersonalInformationReadModel | null> {
        let result = await this.userRepository.getPersonalInformation(input.userId)
        return result
    }

}