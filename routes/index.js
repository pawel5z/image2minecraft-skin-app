const express = require('express');
const fs = require('fs');
const multer = require('multer');
const router = express.Router();
const upload = multer({ dest: 'image_processing/upload' });
const { v4: uuidv4 } = require('uuid');

const util = require('util');

const exec = util.promisify(require('child_process').exec);

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

/* POST home page */
router.post(
  '/',
  upload.fields([{ name: 'frontImg', maxCount: 1 }, { name: 'backImg', maxCount: 1 }]),
  async function (req, res, next) {
    if (!req.files.frontImg || !req.files.backImg) {
      res.render('index', { formInputError: 'Some images are missing.' });
      return next();
    }

    var generatedSkinName = uuidv4() + '.png';
    try {
      await exec(
        `python3 img2mc_skin/main.py skin_template.png upload/${req.files.frontImg[0].filename} upload/${req.files.backImg[0].filename} -o ${generatedSkinName}`,
        { cwd: 'image_processing' });
    } catch (err) {
      console.error(err);
      res.render('index', { formInputError: 'Error creating skin.' });
    }

    // Send generated skin to user.
    res.download(`image_processing/${generatedSkinName}`, 'skin.png', async function (err) {
      if (err) {
        console.error(err);
        res.render('index', { formInputError: 'Error downloading skin.' });
      }
      try {
        await fs.promises.unlink(`image_processing/${generatedSkinName}`);
      } catch (err) {
        console.error(err);
      }
    });
    next();
  },
  async function (req, res, next) {
    // Delete uploaded files.
    try {
      await Promise.all([
        fs.promises.unlink(req.files.frontImg[0].path),
        fs.promises.unlink(req.files.backImg[0].path)
      ]);
    } catch (err) {
      console.error(err);
    }
  }
);

module.exports = router;
