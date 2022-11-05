const express = require("express");
const imageModel = require("../models/imageModel");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "routes/uploads" });
var fs = require("fs");
var path = require("path");

router.get("/getImage", async (req, res) => {
  try {
    const result = await imageModel.find();

    let fileInfos = [];
    await result.forEach((doc) => {
      fileInfos.push({
        name: doc.filename,
        url: "http://localhost:3001/admin/" + doc.filename,
      });
    });

    res.status(201).json(fileInfos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/uploadImage", upload.single("image"), async (req, res) => {
  const file = req.file;
  if (req.file.size > 500000) {
    res.status(500).json({ message: " file iin size ih baina" });
  }
  const obj = {
    filename: req.file.originalname,
    img: {
      name: req.file.filename,
      data: fs.readFileSync(
        path.join(__dirname + "/uploads/" + req.file.filename)
      ),
      contentType: "image/png",
    },
  };
  try {
    const result = await imageModel.create(obj);
    res.json({ message: "uploaded", result });
  } catch (error) {
    res.status(500).json({ message: "failed" });
  }
});
module.exports = router;
