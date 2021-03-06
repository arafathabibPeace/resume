const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const {nanoid} = require('nanoid');

const AccountSchema = mongoose.Schema({
    // _id:{
    //     type: String,
    //     default: () => nanoid()},
    account_name: { type: String, required: true },
    account_description: String,
    users: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    // is_active: { type: Boolean, default: false },
    // is_verified: { type: Boolean, default: false },
    // is_deleted: { type: Boolean, default: false }
}, {
    timestamps: true
});

module.exports = mongoose.model('Account', AccountSchema);

