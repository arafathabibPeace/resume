const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PictureSchema = mongoose.Schema({
    picture_path: String,
    foreign_id: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    onModel: {
        type: String,
        required: true,
        enum: ['Person', 'Skill']
    }
}, {
    timestamp: true
});
module.exports = mongoose.model('Picture', PictureSchema);