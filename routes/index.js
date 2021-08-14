var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: 'image_processing/upload' });
var fs = require('fs');
var child_process = require('child_process');
const { isNullOrUndefined } = require('util');
const { v4: uuidv4 } = require('uuid');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Image to Minecraft skin' });
});

/* POST home page */
router.post('/', 
            upload.fields([{ name: 'frontImg', maxCount: 1 }, { name: 'backImg', maxCount: 1 }]),
            function(req, res, next) {
  if (isNullOrUndefined(req.files.frontImg) || isNullOrUndefined(req.files.backImg))
    return res.send('some images are missing').end();
  
  var generatedSkinName = uuidv4() + '.png';
  child_process.execSync('python3 img2mc_skin/main.py skin_template.png'
                         + ' upload/' + req.files.frontImg[0].filename
                         + ' upload/' + req.files.backImg[0].filename
                         + ' -o ' + generatedSkinName,
                         { cwd: 'image_processing' });

  var file = fs.createReadStream('image_processing/' + generatedSkinName);
  file.on('end', () => {
    fs.unlink('image_processing/' + generatedSkinName, (err) => {
      if (err) throw err;
      console.log(generatedSkinName + ' has been deleted');
    });
  });
  res.header('Content-Disposition', 'attachment; filename="skin.png"');
  file.pipe(res);
})

module.exports = router;
