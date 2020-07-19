var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: 'image_processing' });
var fs = require('fs');
var child_process = require('child_process');
const { isNullOrUndefined } = require('util');
const { v4: uuidv4 } = require('uuid');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Image to minecraft skin!' });
});

/* POST home page */
router.post('/', 
            upload.fields([{ name: 'frontImg', maxCount: 1 }, { name: 'backImg', maxCount: 1 }]),
            function(req, res, next) {
  if (isNullOrUndefined(req.files.frontImg) || isNullOrUndefined(req.files.backImg))
    return res.send('some images are missing').end();
  
  var generatedSkinName = uuidv4() + '.png';
  child_process.execSync('python3 main.py skin_template.png '
                         + req.files.frontImg[0].filename
                         + ' '
                         + req.files.backImg[0].filename
                         + ' '
                         + generatedSkinName,
                         { cwd: 'image_processing' });

                         
  fs.unlink(req.files.frontImg[0].path, (err) => {
    if (err) throw err;
    console.log(req.files.frontImg[0].filename + ' was deleted');
  })
  fs.unlink(req.files.backImg[0].path, (err) => {
    if (err) throw err;
    console.log(req.files.backImg[0].filename + ' was deleted');
  })

  var file = fs.createReadStream('image_processing/' + generatedSkinName);
  file.on('end', () => {
    fs.unlink('image_processing/' + generatedSkinName, (err) => {
      if (err) throw err;
      console.log(generatedSkinName + ' was deleted');
    });
  });
  res.header('Content-Disposition', 'attachment; filename="skin.png"');
  file.pipe(res);
})

module.exports = router;
