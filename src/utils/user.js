const Joi = require('joi');
const jwt = require('jsonwebtoken');
const getId = require('../services/user')
// const expireToken = new Set(); 
/*
 @params : user
 @Description: Created User function for use joi validation pass user parameters. this function return userSchema

*/
const User = (user)=>{
 userSchema = Joi.object({
    name: Joi.string()
          .min(3)
          .max(12)
          .required(),
   
      email: Joi.string()
             .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

      age: Joi.number()
           .required(),
      
      role: Joi.string()
            .required(),

      gender: Joi.string()
              .required(),

      blood_group: Joi.string(),

      password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

      phone_number: Joi.string()
                    .length(10)
                    .pattern(/^[0-9]+$/)
                    .required(),
      address: Joi.string()
               .required(),

      last_donation_date: Joi.date(),

});
return userSchema.validate(user)
}

const updatedUser = (user)=>{
        userSchema = Joi.object({
           name: Joi.string()
                 .min(3)
                 .max(12),
          
             email: Joi.string()
                    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
       
             age: Joi.number(),
       
             gender: Joi.string(),
       
             blood_group: Joi.string(),
       
             password: Joi.string()
                       .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
       
             phone_number: Joi.string()
                           .length(10)
                           .pattern(/^[0-9]+$/),
             address: Joi.string(),
       
             last_donation_date: Joi.date(),
            
       
       });
       return userSchema.validate(user)
       }

       /*
        @params: userData 
       */
       const loginJwt=  async(userData)=>{
         const userId = await getId.checkEmail(userData);
         if (userId){
          console.log(userId);
          const token =  jwt.sign({id:userId.id, email:userId.email},  process.env.SECRET_KEY, {expiresIn:"600s"});
          // console.log(token);
          // req.data = token; 
          return token
         }
         return "user not exist";
       }

      // const logout = async(token)=>{
      //       expireToken.add(token);
      //       setTimeout(()=>expireToken.delete(token),0*0*601);
      // }


       const sendResponse = (res, message, data, statusCode, isError = false) =>{
              const info = {
                status: statusCode,
                message: message,
                data: data,
                error: isError,
              };
            
              console.log(info);
              res.status(statusCode).json(info);
            }



 

module.exports = {User,updatedUser, loginJwt, sendResponse};