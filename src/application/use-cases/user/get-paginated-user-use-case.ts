import { UserRepository } from "../../../domain/repositories/user-repository";

interface GetPaginatedUserInput {
    pageNumber: number;
    pageSize: number;
    sortBy: string;
    sortOrder: string;
}

//getPaginated: (pageNumber: number, pageSize: number, sortBy: string, sortOrder: string) => Promise<UserEntity[]>;
export class GetPaginatedUserUseCase {

    constructor(
        private readonly userRepository: UserRepository
    ) { }

    async execute(input: GetPaginatedUserInput) : Promise<any> {
        let result = await this.userRepository.getPaginated(input.pageNumber, input.pageSize, input.sortBy, input.sortOrder)

        result = result.map(user => ({
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            createdAt: user.createdAt,
            password: null,
            passwordResetCode: null,            
        }))

        return result
    }
}