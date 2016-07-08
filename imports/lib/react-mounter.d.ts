declare module 'react-mounter' {
    interface Mounter {
        mount(component: any, props: any): any;
    }

    var mounter: Mounter;
    export = mounter;
}