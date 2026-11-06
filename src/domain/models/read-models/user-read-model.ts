export class UserReadModel {
    
    constructor(
        public userId: number,
        public email: string,
        public fullName: string        
    ) {
    }
}