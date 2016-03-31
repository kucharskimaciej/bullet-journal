declare namespace ServiceConfiguration {
    export interface ISerivceConfiguration {
        service: string;
        appId?: string;
        clientId?: string;
        secret: string;
    }

    export const configurations: Mongo.Collection<ISerivceConfiguration>;
}