var mongoose = require('mongoose');

var ProviderSchema = mongoose.Schema({
    name: {
        type: String,
        enum: {
            values: [ "facebook", "google" ]
        },
        required: true
    },
    provider_id: {
        type: String,
        required: true
    }
});
ProviderSchema.belongsTo('User', { through: 'user' });
var Provider = mongoose.Model("Provider", ProviderSchema);

exports = Provider;
