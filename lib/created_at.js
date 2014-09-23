module.exports = function (schema) {
    schema.add({ created_at: { type: Date, default: Date.now }})
};