const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({

    username: { type: String, required: true },
    password: { type: String, required: true },
    account: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    employees: [{
        type: Schema.Types.ObjectId,
        ref: 'Employee',
    }]
    

}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);

