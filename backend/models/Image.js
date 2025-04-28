const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  imageUrl: String,
  faceEncoding: [Number]
});

module.exports = mongoose.model('Image', ImageSchema);
