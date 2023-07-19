const userMiddleware = require('../utils/user')
const jwt = require('jsonwebtoken');



exports.verifyToken= (req,res,next) =>{
    const token = req.headers['token'];
    if(!token){
        console.log(token)
      return  res.status(401).json({ 
            status: "401",
            message: 'User are not authenticated.'
             });
    }
    jwt.verify(token, process.env.SECRET_KEY, async function(err){
        if(err){
            return res.status(500).json({
            status: "500",
            message: 'Failed to authenticate token'
            })   
        }
        next()
    })
}



/*
@params: req, res, next
@request : req.body data
@response : status message.
@Description: data function is middleware function for validation of user data.
require userMiddleware from utils and pass user(req.body) as argument in userMiddleware function. 
if error any error return then response error status message with mentioned error and if no error occur then next() return
*/
exports.data =(req,res,next)=>{
    user = req.body
    response = userMiddleware.User(user);
    if(response.error){
        res.status(400).send({
        Status: '400',
        msg: 'User not created',
        error: response.error.details[0].message
        })
    }
    else{
        next()
    }
}


/*
@params: req, res, next
@request : req.body data
@response : status message.
@Description: updateData function is middleware function for validate the user data while user update their details.
require userMiddleware from utils and pass user(req.body) as argument in userMiddleware function. 
if error any error return then response error status message with mentioned error and if no error occur then next() return
*/

 exports.updateData = (req,res,next)=>{
    user = req.body
    response = userMiddleware.updatedUser(user);
    if(response.error){
        res.status(400).send({
        Status: '400',
        msg: 'User not updated',
        error: response.error.details[0].message
        })
    }
    else{
       next()
    }
}




exports.userLoginAuth = (req,res,next) => {
     user = req.body
     const token = userMiddleware.loginJwt(user);
     console.log(token);
     req.token = token;
     next();
};

 