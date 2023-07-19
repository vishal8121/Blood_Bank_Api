const userMiddleware = require('../utils/user')

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

 