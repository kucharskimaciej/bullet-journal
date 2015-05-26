var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    }
});

schema.plugin(createdAt);
UserSchema.hasMany('Provider', { dependent: 'delete' });

var User = mongoose.Model("User", UserSchema);

module.exports = User;
