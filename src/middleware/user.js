const userMiddleware = require('../utils/user')

/*
@params: req, res, next
@request : req.body data
@response : status message.
@Description: data function is middleware function for validation of user data.
require userMiddleware from utils and pass user(req.body) as argument in userMiddleware function. 
if error any error return then response error status message with mentioned error and if no error occur then next() return
*/
const data =(req,res,next)=>{
    user = req.body
    response = userMiddleware(user);
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
module.exports = data;

 