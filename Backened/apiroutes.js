const express = require('express');
const router = express.Router();
const appController = require('./controller');
var multer = require('multer');
const storage = multer.diskStorage(
    {
        destination: (req, file, callBack) => 
        {
            callBack(null, './uploads/')
        },
        filename: (req, file, callBack) => 
        {
             console.log(file)
             callBack(null, file.originalname)
        }
  });
  const upload = multer({storage:storage,limits:{
      fileSize:1024 * 1024 * 8
  }});


router.post('/post-data',upload.single('image'),appController.postData);
router.get('/get-data',appController.getData);

module.exports = router;