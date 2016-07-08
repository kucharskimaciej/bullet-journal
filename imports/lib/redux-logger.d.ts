interface ReduxLogger {
    (): any;
}

declare var logger: ReduxLogger;
declare module 'redux-logger' {
    export default logger;
}