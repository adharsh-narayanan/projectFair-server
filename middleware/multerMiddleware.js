//1)import multer

const multer = require("multer");


//2)create storage space

const storage = multer.diskStorage({
   destination:(req,file,callback)=>{
    callback(null,'./uploads')  //the location where the uploaded file should be locally stored
   },
   filename:(req,file,callback)=>{
    filename=`image-${Date.now()}-${file.originalname}`   //Date.now() returs time in milliseconds from 1970 onwards
    callback(null,filename)  //first argument should be error or null
   }
})

//3)file filter

const fileFilter = (req,file,callback)=>{
    if(file.mimetype==='image/png'||file.mimetype==='image/jpeg'||file.mimetype==='image/jpg'){
        callback(null,true)
    }else{
        callback(null,false)
        return callback(new error("only jpeg,jpg or png files are allowed"))
    }
}

//4)

const multerconfig = multer({
    storage,
    fileFilter
})


//export
module.exports=multerconfig