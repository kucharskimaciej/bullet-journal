declare module Meteor {
    interface ErrorStatic {
        new(error:string|number, reason?:string, details?:string): Error;
    }

}