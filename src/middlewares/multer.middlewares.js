import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/temp')
  },
  filename: function (req, file, cb) {
    // todo : to check whether i m able to change file name or not !
    //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname)
 //fieldname + '-' + uniqueSuffix will use it
    
 }
})

export const upload = multer({ storage })