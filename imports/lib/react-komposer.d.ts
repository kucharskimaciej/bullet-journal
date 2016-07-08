declare namespace komposer {

    interface IContainerFn {
        (childComponent: new () => __React.Component<any, any>,
         LoadingComponent?: new () => __React.Component<any, any>,
         ErrorComponent?: new () =>  __React.Component<any, any>): new () => __React.Component<any, any>;
    }

    interface IOnData {
        (error: Error|void, props: any): void;
    }

    interface ICompositionFn {
        (props: any, onData: IOnData): any|Function;
    }

    function compose(compositionFn: ICompositionFn,
                     LoadingComponent?: new () => __React.Component<any, any>,
                     ErrorComponent?: new () => __React.Component<any, any>): IContainerFn;

    function composeWithTracker(compositionFn: ICompositionFn,
                                LoadingComponent?: new () => __React.Component<any, any>,
                                ErrorComponent?: new () => __React.Component<any, any>,
                                options?: any): IContainerFn;
}

declare module 'react-komposer' {
    export = komposer;
}