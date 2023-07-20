const service = require("../services/user");
const bcrypt = require('bcrypt');
const response = require('../utils/user')
const db = require('../model/index');
const sequelize = db.sequelize




/***********************************************************************
 
 @Params : req and res
 @Request : req.body
 @Response : request status in json format with status code
 @Description : userRegister function request data from user.
 checkEmail function check email already exist or not.
 if user data not exist(user == null) user created else send response user already registered.  
 addUser function require from service file and called in this function and pass userData (req.body) data as arguments , In response user status return 

 *****************************************************************************/

exports.userRegister = async (req, res) => {
    await sequelize.sync();
    const user = await service.checkEmail(req.body.email);
    if (user == null) {
        encryptedPassword = await bcrypt.hash(req.body.password, 10);
        const userData = {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            gender: req.body.gender,
            blood_group: req.body.blood_group,
            password: encryptedPassword,
            role: "user",
            phone_number: req.body.phone_number,
            address: req.body.address,
            last_donation_date: req.body.last_donation_date,
            status: "inactive",
            is_delete: false,
            created_by: req.body.name
        }
        const data = await service.addUser(userData);
        return res.status(201).send(response.success("User created successfully",data,201));
    
    }
    else {
        return res.send(response.error("User email already registered",200));
    }
}


/*******************************************************************************
@Params : req and res
@Response : user data and status

******************************************************************************/

exports.getUsers = (async (req, res) => {
    const users = await service.getUser()
    if (users.length == 0) {
        return res.status(200).send(response.error("No Data Found:",200)); 
        // return res.status(200).json({ status: 200, data: users, message: "No data found" });
    }
    return res.status(200).send(response.success("All Users Data",data,200));
    // return res.status(200).json({ status: 200, data: users, message: "All Users Data" });
});


/**********************************************************************
 
@request: id and req.body(user data)
@response: status code with mention message.
@Params : req and res
@Description : This function return response for updated user. updateUser function will be called and req.params.id or req.body pass as arguments to function.

************************************************************************/

exports.updateUser = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    await service.updateUser(id, data);
    return res.send(response.success("User updated successfully",data,200));
}


/*****************************************************************************
 
 @Params : req and res
@request: id 
@response: status code with mention message.
@Description : This function return response for Deleted user. deleteUser function will be called and req.params.id pass as arguments to function. It return response for deleted user.

*****************************************************************************/

exports.deleteUser = async (req, res) => {
    id = req.params.id;
    const user = await service.deleteUser(id);
    return res.status(200).send(response.success("User deleted successfully",user,200));
}


/****************************************************************************

 @Params : req and res
@request: req.body data
@response: status code with mention message.
@Description : This function return response for login  user. loginUSer function will be called and email pass as arguments to function. It return response for  user login status.

*****************************************************************************/


exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await service.loginUser(email);
        if (user != null) {
            if (await bcrypt.compare(password, user.password)) {
                // Passwords match
                return res.send(response.success("User login successfully",user,200));
            } else {
                // Passwords do not match
              return res.status(403).send(response.error("Password incorrect",403)); 
            }
        }
        // User not found
        return res.status(403).send(response.error("User does not exist",403));
    } catch (e) {
        console.log("Error" + e);
        return res.status(500).send(response.error("Internal Server Error:"+e,500)); 
    }
};





