import { UserEntity } from "../models/entities/user-entity";
import { UserPersonalInformationReadModel } from "../models/read-models/user-personal-information-read-model";

export interface UserRepository {

    // register a new user and return a token
    register(email: string, password: string, firstName: string, lastName: string) : Promise<UserEntity>;

    // get credentials
    getByEmail(email: string) : Promise<UserEntity | null>;

    // get credentials
    getById(id: number) : Promise<UserEntity | null>;

    // get a paginated list of users
    getPaginated(pageNumber: number, pageSize: number, sortBy: string, sortOrder: string) : Promise<UserEntity[]>;

    // change the password of a user
    changePassword(userId: number, newPassword: string) : Promise<void>;

    // process for forgot password
    forgotPasswordSaveCode(email: string, code: string) : Promise<void>;
    forgotPasswordApplyCode(email: string, code: string, newPassword: string) : Promise<boolean>; 
    
    // deletes personal information
    deletePersonalInformation(userId: number): Promise<boolean>

    // gets personal information
    getPersonalInformation(userId: number) : Promise<UserPersonalInformationReadModel | null>
}