import { JobEntity } from "./job-entity";
import { PersonalInformationEntity } from "./personal-information-entity";

export class UserEntity {

    public personalInformation?: PersonalInformationEntity;
    public jobs?: JobEntity[];

    constructor(
        public readonly id: number,
        public readonly email: string,
        public readonly password: string | null,
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly createdAt: Date,
        public readonly passwordResetCode: string | null
    ) { }

}








