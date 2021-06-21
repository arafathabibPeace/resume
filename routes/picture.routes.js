const express = require('express');
const router = express.Router();
const pictureController = require('../controllers/picture.controller');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    },
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            cb(new Error('Please upload an image.'))
        }
        cb(undefined, true)
    }
});


const upload = multer({
    // dest: 'images',
    storage: storage


})

//Upload picture
router.post('/', upload.single('picture'), pictureController.create);//'picture' is the fieldname

// Retrieve all users
router.get('/', pictureController.findAll);

// Retrieve a single user with id
router.get('/:id', pictureController.findById);

// Update a user with id
router.put('/', pictureController.update);

// Delete a user with id
router.delete('/', pictureController.delete);

module.exports = router