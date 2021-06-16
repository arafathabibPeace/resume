const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = mongoose.Schema({
    first_name: { type: String, required: true },
    middle_name: { type: String, required: true },
    last_name: { type: String, required: true },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // personal_details: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Person'
    // },
    // contact_details: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Contact'
    // }],
    // skills:[{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Skill'
    // }],
    // employment_history:[{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Employment'
    // }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Employee', EmployeeSchema);

