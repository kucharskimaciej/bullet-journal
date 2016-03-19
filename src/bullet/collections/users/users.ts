export interface IUser {
    _id: string;
    profile: {
        name: string;
    };
    services: {
        facebook?: {
            email: string;
            first_name: string;
        }
    };
}