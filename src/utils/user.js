const Joi = require('joi');
const jwt = require('jsonwebtoken');
const getId = require('../services/user')
const nodemailer = require('nodemailer');
// const expireToken = new Set(); 

/****************************************************************
 
 @params : user
 @Description: Created User function for use joi validation pass user parameters. this function return userSchema

****************************************************************/

const User = (user) => {
  userSchema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(25) 
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


/****************************************************************
 
 @params : user
 @Description: Created updatedUser function for use joi validation pass user parameters. this function returns the updated schema

****************************************************************/

const updatedUser = (user) => {
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

/*******************************************************************************

 @params : userData 
 @description : this function token using secret key for user, it return that token if user exists and if user not exist then return user not exist

*******************************************************************************/
const loginJwt = async (userData) => {
  const userId = await getId.checkEmail(userData);
  if (userId) {
    console.log(userId);
    const token = jwt.sign({ id: userId.id, email: userId.email }, process.env.SECRET_KEY, { expiresIn: "600s" });
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


/*******************************************************************************

 @params : res, message, data, statusCode, isError(defaultValue=false)
 @response : object with response data
 @description : this function return response with given parameters

*******************************************************************************/

const sendResponse = (res, message, data, statusCode, isError = false) => {
  const info = {
    status: statusCode,
    message: message,
    data: data,
    error: isError,
  };

  console.log(info);
  res.status(statusCode).json(info);
}


/*******************************************************************************

 @params : mailDetails
 @description : this sendEmail function  is create to send email to registered blood bank when they request to bloobank and also when their request approved.

*******************************************************************************/

const sendEmail = (mailDetails) => {
  let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'vishalkumarwins@gmail.com',
      pass: 'oqvoqqalurxnpump'
    }
  });
  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log('Error Occurs');
    } else {
      console.log('Email sent successfully');
    }
  });
}




module.exports = { User, updatedUser, loginJwt, sendResponse, sendEmail };