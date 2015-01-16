var markdown = require('marked');

module.exports = function (source, dest) {
    source = source || 'markdown';
    dest = dest || 'html';

    return function (schema) {
        schema.pre('save', function (next) {

            if (this[source]) {
                this[dest] = markdown( this[source] );
            }

            next();

        });
    };
};