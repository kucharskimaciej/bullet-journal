export interface IActionHandler<T> {
    (payload: T): void;
}

export interface IActionCreator {
    (name: string, handler: any): (payload: any) => void;
}

export const createAction: IActionCreator = (name, handler) => {
    return (payload) => handler(payload);
};