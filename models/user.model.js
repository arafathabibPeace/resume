const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const { nanoid } = require('nanoid');

const UserSchema = mongoose.Schema({
    // _id: {
    //     type: String,
    //     default: () => nanoid()
    // },
    username: String,
    password: String,
    account: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    // is_active: { type: Boolean, default: false },
    // is_verified: { type: Boolean, default: false },
    // is_deleted: { type: Boolean, default: false }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);

