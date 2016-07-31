import {ISubject} from "../subjects";

export abstract class AbstractRecordProvider {
    public abstract notify(subject: ISubject<any>): void;

    protected abstract onCreatePost(subject: ISubject<any>): any;
    protected abstract onRemovePost(subject: ISubject<any>): any;
    protected abstract createFromScratch(user_id: string): any;
}