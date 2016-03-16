declare namespace komposer {
    import Component = __React.Component;
    interface IContainerFn {
        (childComponent: Component, LoadingComponent?: Component, ErrorComponent?: Component): Component;
    }

    interface IOnData {
        (error: Error|void, props: any): void;
    }

    interface ICompositionFn {
        (props: any, onData: IOnData): any|Function;
    }

    function compose(compositionFn: ICompositionFn,
                     LoadingComponent?: Component,
                     ErrorComponent?: Component): IContainerFn;

    function composeWithTracker(compositionFn: ICompositionFn,
                                LoadingComponent?: Component,
                                ErrorComponent?: Component,
                                options?: any): IContainerFn;
}

declare module 'react-komposer' {
    export = komposer;
}