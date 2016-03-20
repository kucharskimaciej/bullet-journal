declare module 'meteor/meteorhacks:flow-router' {
    interface IRouteDefinition {
        pathDef: string;
        name: string;
        options?: Object;
    }

    interface IPathDefinition {
        path: string;
        params?: Object;
        queryParams?: Object;
        route: IRouteDefinition;
    }

    interface IRouteOptions {
        action?(params?: Object, queryParams?: Object): void;
        subscriptions?(params?: Object, queryParams?: Object): void;
    }

    export interface FlowRouter {
        initialize(): void;
        wait(): void;
        route(path: string, routeOptions: IRouteOptions): void;

        getParam(paramName: string): string;
        current(): IPathDefinition;
        watchPathChange(): void;
        reload(): void;
    }
}