// preguntar si existe personal information
// si: actualizar, no: crear

import th from "zod/v4/locales/th.js";
import { UserRepository } from "../../../../domain/repositories/user-repository";

/*
    updatePersonalInformation(
        userId: number, 
        user: {firstName: string; lastName: string}, 
        personalInformation: { birthDate: Date; birthCountry: string | null, birthState: string | null }
    ) : Promise<void>
*/

interface UpdatePersonalInformationInput {
    userId: number, 
    user: {firstName: string; lastName: string}, 
    personalInformation: { birthDate: Date; birthCountry: string | null, birthState: string | null }
}

export class UpdateUserPersonalInformationUseCase {

    constructor(
        private readonly userRepository: UserRepository
    ) {        
    }

    async execute(input: UpdatePersonalInformationInput) : Promise<void> {
        await this.userRepository.updatePersonalInformation(input.userId, input.user, input.personalInformation)
    }
}