export class UserPersonalInformationReadModel {
    constructor(
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly email: string, 
        public readonly createdAt: Date,
        public readonly birthCountry: string | null,
        public readonly birthState: string | null,
        public readonly birthDate: Date | null
    ) {}
}