import * as _marked from 'marked';

_marked.setOptions({
    renderer: new _marked.Renderer(),
    gfm: true,
    tables: false,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: true
});

export function marked (content) {
    return _marked(content);
}
 