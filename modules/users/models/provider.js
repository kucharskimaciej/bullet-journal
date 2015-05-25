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

var Provider = mongoose.Model("Provider", ProviderSchema);

module.exports = Provider;
