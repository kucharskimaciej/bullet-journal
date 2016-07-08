import {IValidationErrors} from './validation_messages';

export interface IValidator {
    (value: string): IValidationErrors|void;
}

export function isRequired(value: string): IValidationErrors|void {
    if (value && !!value.trim()) {
        return;
    }

    return { required: true };
}

export function minLength(constraint: number) {
    return (value: string): IValidationErrors|void => {
        if (value && value.length > constraint) {
            return;
        }

        return { minLength: true };
    };
}

export function maxLength(constraint: number) {
    return (value: string): IValidationErrors|void => {
        if (!value || value.length <= 200) {
            return;
        }

        return {
            maxLength: true
        };
    };
}

export function emptyOrMinLength(constraint: number) {
    return (value: string): IValidationErrors|void => {
        if (!value || value.length > constraint) {
            return;
        }

        return { emptyOrMinLength: true };
    };
}