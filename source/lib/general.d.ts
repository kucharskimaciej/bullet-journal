import HTMLAttributes = __React.HTMLAttributes;
interface ObjectConstructor {
    assign(destination: any, ...sources: any[]): any;
}

declare var require:(module:string) => any;

interface IComponentProps extends HTMLAttributes {
    className?: string;
    value?: any;
    disabled?: boolean;
}

declare var process: any;