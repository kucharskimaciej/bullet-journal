interface ObjectConstructor {
    assign(destination: any, ...sources: any[]): any;
}

declare var require:(module:string) => any;