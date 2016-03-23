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
    triggersEnter?: TriggerHandler|TriggerHandler[];
    triggersExit?: TriggerHandler|TriggerHandler[];
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

declare namespace FlowRouter {
    export var notFound: RouteOptions;

    export function initialize(): void;

    export function wait(): void;

    export function go(pathDef: string, params?: Object, queryParams?: Object): void;

    export function path(pathDef: string, params?: Object, queryParams?: Object): string;

    export function route(path:string, routeOptions:RouteOptions): void;

    export function group(options:GroupOptions): Group;

    export function getParam(paramName: string): string;

    export function setParams(newParams: Object): boolean;

    export function setQueryParams(newParams: Object): boolean;

    export function current(): RouteDefinition;

    export function watchPathChange(): void;

    export function reload(): void;

    export function redirect(path: string): void;

    export function subsReady(): boolean;

}
