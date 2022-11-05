const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  filename: String,
  img: {
    name: String,
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model("ImageModel", ImageSchema);
