export interface IRegister {
    (server:any, options:any, next:any): void;
    attributes?: any;
}

export abstract class Plugin {
    constructor(private name: string) {
        this.register.attributes = {
            name: this.name,
            version: '0.1.0'
        };
    }

    register: IRegister = (server, options, next) => {
        server.bind(this);
        this._register(server, options);
        next();
    };

    protected _register(server, options): any {
    }

    errorInit(error) {
        if (error) {
            console.log(`Error: Failed to load plugin (${this.name}):`, error);
        }
    }
}