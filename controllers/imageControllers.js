const Image =  require('../models/imageModel');
const catchAsync = require('../utils/catchAsync');
const multer = require('multer')
const cloudinary = require("cloudinary").v2;




cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const multerStorage = multer.diskStorage({});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadProductImages = upload.array("images", 4);

// ADD IMAGE
exports.addImage =catchAsync(async(req,res,next)=>{
    let images = []
    let result
    await Promise.all(
    req.files.map(catchAsync (async file=>{
      result = await cloudinary.uploader.upload(file.path);
      images.push({url:result.url,public_id: result.public_id})
    }))
    )
    res.status(201).json({
      status:'success',
      message: 'files uploaded successfully',
      data:[
        images
    ]
    })
  
})

// CHECK DATA
exports.allImage=catchAsync(async(req,res,next)=>{
  const allData = await Image.find()
  res.status(201).json({
    status:'success',
    message: 'files uploaded successfully',
    data:[
      allData
  ]
})
})