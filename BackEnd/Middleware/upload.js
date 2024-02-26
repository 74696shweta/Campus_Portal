const multer  = require('multer')
const {v4: uuidv4} = require('uuid')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null,uuidv4() + '-' + Date.now() + path.extname(file.originalname))
    }
  });
  const fileFilter = (req,file,cb) => {
    const allowedExtesion = ['image/jpeg','image/jpg','image/png']
    if(allowedExtesion.includes(file.mimetype)){
        cb(null,true);
    } else {
        cb(null,false);
    }
  }
  


  let uploadImages = multer({storage,fileFilter});

  module.exports  = uploadImages