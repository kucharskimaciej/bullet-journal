declare namespace Mongo {


    interface ComputedFields<T> {
        add(name: string, fn: any): void
    }

    interface ComputedField<T> {
        set(value: any): void;
    }

    interface Collection<T> {
        computedFields: ComputedFields<T>
    }
}