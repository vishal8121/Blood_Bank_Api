const Joi = require('joi');

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

      gender: Joi.string()
              .required(),

      blood_group: Joi.string()
                   .required(),

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
             updated_by: Joi.string()
                         .required(),
       
       });
       return userSchema.validate(user)
       }


module.exports = {User,updatedUser};