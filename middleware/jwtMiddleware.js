const jwt = require('jsonwebtoken')

//verify token



const jwtMiddleware = (req,res,next)=>{
    console.log('inside jwt middleware')
    const token = req.headers['authorization'].split(" ")[1]
    //console.log(token);
 try{
    const response= jwt.verify(token,"confidential123")
    //console.log(response);

    req.payload = response.userId   //to send userId to project controller so that each individual uploads and all uploads can be seperated

   
    next()
 }
 catch(error){
    console.log('Auhtorization failed due to',error);
 }
}

module.exports = jwtMiddleware