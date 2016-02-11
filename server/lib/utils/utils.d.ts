declare module utils {

    var authenticate;
    var findById;


    class Methods<CollectionType> {
        private collection: CollectionType;
        constructor(collection: CollectionType);
        userId: string;
    }

    interface IRegisterMethodsConfig {
        collection: any;
        methods: string[];
    }
    function registerMethods(config: IRegisterMethodsConfig): any;

}