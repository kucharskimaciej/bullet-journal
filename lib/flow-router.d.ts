declare module 'meteor/kadira:flow-router' {
    interface State {
        path: string;
    }

    interface Context {
        canonicalPath: string;
        hash: string;
        init: boolean;
        params: Object;
        path: string;
        pathname: string;
        state: State;
        title: string;
    }

    interface TriggerHandler {
        (
            context: RouteDefinition,
            doRedirect: (url:string, params:Object, queryParams:Object) => void,
            doStop: () => void
        ): void;
    }

    interface GroupOptions {
        triggerEnter?: TriggerHandler|TriggerHandler[];
        triggerExit?: TriggerHandler|TriggerHandler[];
        name?: string;
        prefix?: string;
        subscriptions?(params?:Object, queryParams?:Object): void;
    }

    interface RouteDefinition {
        pathDef: string;
        name: string;
        options?: Object;
    }

    interface RouteDefinition {
        context?: Context;
        path: string;
        params?: Object;
        queryParams?: Object;
        route: RouteDefinition;
        oldRoute?: RouteDefinition;
        group?: Group;
    }

    interface RouteOptions {
        name?: string;
        action?(params: Object, queryParams: Object): void;
        subscriptions?(params?: Object, queryParams?: Object): void;
    }

    interface Group {
        route(path:string, routeOptions:RouteOptions): void;
        group(options:GroupOptions): Group;
    }

    export interface FlowRouter {
        notFound(): void;
        initialize(): void;
        wait(): void;
        go(pathDef: string, params?: Object, queryParams?: Object): void;
        path(pathDef: string, params?: Object, queryParams?: Object): string;
        route(path:string, routeOptions:RouteOptions): void;
        group(options:GroupOptions): Group;

        getParam(paramName: string): string;
        setParams(newParams: Object): boolean;
        setQueryParams(newParams: Object): boolean;
        current(): RouteDefinition;
        watchPathChange(): void;
        reload(): void;
        redirect(path: string): void;

        subsReady(): boolean;
    }
}