
/*
* register (PUBLIC)
* log-in (PUBLIC)
* get-paginated (role:ADMIN)
* change-password (role:USER)
* forgot-password-step-1 (envia correo con codigo) (PUBLIC)
* forgot-password-step-2 (aplica codigo y cambia contraseña) (PUBLIC)
*/

import { UserEntity } from "../models/entities/user-entity";
import { TokenReadModel } from "../models/read-models/token-read-model";
import { UserReadModel } from "../models/read-models/user-read-model";

export interface UserRepository {

    // register a new user and return a token
    register(email: string, password: string, firstName: string, lastName: string) : Promise<UserEntity>;

    // get credentials
    getByEmail(email: string) : Promise<UserEntity | null>;

    // get a paginated list of users
    getPaginated(pageNumber: number, pageSize: number, sortBy: string, sortOrder: string) : Promise<UserEntity[]>;

    // change the password of a user
    changePassword(userId: number, newPassword: string) : Promise<void>;

    // forgot password step 1: get info to send email and save code
    forgotPasswordStep1(email: string, code: string) : Promise<UserReadModel>;

    // forgot password step 2: apply the code and change the password
    forgotPasswordStep2(email: string, code: string, newPassword: string) : Promise<void>;

}