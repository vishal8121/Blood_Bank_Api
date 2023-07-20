const userMiddleware = require('../utils/user')
const jwt = require('jsonwebtoken');
const responseObj = require('../utils/user')



/********************************************************************

@params : req,res,next
@request : token
@response : request status message
@Description : This verifyToken function are middleware to verify the token
if token not present in req.headers then return response error message and if token present then verify token if token is valid then return next() else show authentication error message  

*********************************************************************/
exports.verifyToken= (req,res,next) =>{
    const token = req.headers['token'];
    if(!token){
        console.log(token)
        return res.status(401).send(responseObj.error("User not authenticated",401));
    }
    jwt.verify(token, process.env.SECRET_KEY, async function(err){
        if(err){
            return res.status(500).send(responseObj.error("Failed to authenticate token",500));
        }
        next()
    })
}



/*******************************************************************
 
@params : req, res, next
@request : req.body data
@response : status message.
@Description : data function is middleware function for validation of user data.
require userMiddleware from utils and pass user(req.body) as argument in userMiddleware function. 
if error any error return then response error status message with mentioned error and if no error occur then next() return

************************************************************************/
exports.data =(req,res,next)=>{
    user = req.body
    response = userMiddleware.User(user);
    if(response.error){
        return res.status(400).send(responseObj.error("User not created",400));
    }
    else{
        next()
    }
}


/**************************************************************
 
@params : req, res, next
@request : req.body data
@response : status message.
@Description : updateData function is middleware function for validate the user data while user update their details.
require userMiddleware from utils and pass user(req.body) as argument in userMiddleware function. 
if error any error return then response error status message with mentioned error and if no error occur then next() return

***************************************************************/

 exports.updateData = (req,res,next)=>{
    user = req.body
    response = userMiddleware.updatedUser(user);
    if(response.error){
        return res.status(400).send(responseObj.error(response.error.details[0].message,400));
    }
    else{
       next()
    }
}

/*********************************************************************
@params : req, res, next
@request : req.body data
@response : status message.
@Description : This userLoginAuth middleware function is used to generate token for user 

***************************************************************/

exports.userLoginAuth = (req,res,next) => {
     user = req.body
     const token = userMiddleware.loginJwt(user);
     req.token = token;
     console.log(token);
     next();
};

 