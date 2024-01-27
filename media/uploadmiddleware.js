const multer = require('multer');
const sharp = require('sharp');
const multerStorage = multer.memoryStorage();

const multerFilter = (req,file,cb)=>{
  if(file.mimetype.startsWith('image')){
    cb(null, true);
  }else{
    cb(null,false)
  }
}

const upload = multer({
  storage :multerStorage,
  fileFilter:multerFilter,
}); 

exports.coverImageUpload = upload.single('image');

exports.imageResize = async(req, res, next)=>{
    try {
        console.log(req.files);
        if(!req.file) return next();
        req.file.originalname = `blog-${Date.now()}.jpeg`;
      
        req.body.coverImage = req.file.originalname
        await sharp(req.file.buffer)
          .resize(2000,1333)
          .toFormat('jpeg')
          .jpeg({quality:90})
          .toFile(`upload/${req.file.originalname}`);
        next();
    } catch (error) {
        console.log(error)
    }
}