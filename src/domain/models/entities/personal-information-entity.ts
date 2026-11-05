export class PersonalInformationEntity {

    constructor(
        public readonly id: number,
        public readonly birthDate: Date,
        public readonly birthState: string | null,
        public readonly birthCountry: string | null,
        public readonly updatedAt: Date,
        public readonly userId: number
    ) { }

}