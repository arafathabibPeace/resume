const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({

    username: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: String, required: true },
    on_parent: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    onModel: {
        type: String,
        required: true,
        enum: ['Account']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);

