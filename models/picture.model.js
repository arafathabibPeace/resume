const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PictureSchema = mongoose.Schema({
    picture_name: { type: String, required: true },
    picture_path: String,
    on_parent: {
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