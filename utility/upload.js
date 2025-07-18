const multer = require('multer')
const {CloudinaryStorage} = require('multer-storage-cloudinary')
const cloudinary = require('../utility/cloudinary.config')
// const fs = require('fs');
// const path = require('path');

const storage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:'images',
        allowed_formats : ['jpg','jpeg','png','webp','avif']
    }
})

const upload = multer({
    storage:storage,
    // limits:{ fileSize: 10 * 1024 * 1024 }
})

module.exports = upload