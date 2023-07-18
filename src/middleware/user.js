const userMiddleware = require('../utils/user')

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

 