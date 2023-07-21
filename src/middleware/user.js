const userMiddleware = require('../utils/user')
const jwt = require('jsonwebtoken');
// const responseObj = require('../utils/user')
const getAllUtils = require('../utils/user')
const response = getAllUtils.sendResponse


/********************************************************************

@params : req,res,next
@request : token
@response : request status message
@Description : This verifyToken function are middleware to verify the token
if token not present in req.headers then return response error message and if token present then verify token if token is valid then return next() else show authentication error message  

*********************************************************************/
exports.verifyToken = (req, res, next) => {
    const token = req.headers['token'];
    if (!token) {
        console.log(token);
        return response(res, "User not authenticated", null, 401, true);
    } else {
        try {
            const decode = jwt.verify(token, process.env.SECRET_KEY);
            req.data = decode.id;
            console.log(req.data);
            next();
        } catch (error) {
            return response(res, "Failed to authenticate token", null, 500, true);
        }
    }
};



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
    responseObj = userMiddleware.User(user);
    if(responseObj.error){
        return response(res,"User not created",null,"400",responseObj.error.details[0].message);
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
    responseResult = userMiddleware.updatedUser(user);
    if(responseResult.error){
        return res.status(400).send(responseObj.error(responseResult.error.details[0].message,400));
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

exports.userLoginAuth = async(req,res,next) => {
     user = req.body
     const token = await userMiddleware.loginJwt(user.email);
     req.token = token;
     console.log(token);
     next();
};

 