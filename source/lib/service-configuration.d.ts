declare namespace ServiceConfiguration {
    export interface ISerivceConfiguration {
        service: string;
        appId: string;
        secret: string;
    }

    export const configurations: Mongo.Collection<ISerivceConfiguration>;
}