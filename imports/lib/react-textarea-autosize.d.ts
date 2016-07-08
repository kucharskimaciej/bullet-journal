import Component = __React.Component;
interface TextareaAutosize {
    new (): Component<any, any>;
}

declare var textareaAutosize: TextareaAutosize;
declare module 'react-textarea-autosize' {
    export default textareaAutosize;
}