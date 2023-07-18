    const service = require("../services/user")
    const md5 = require('md5');
   
    /*
     @Params : req and res
     @Request : req.body
     @Response : request status in json format with status code
     @Description : userRegister function request data from user.
     checkEmail function check email already exist or not.
     if user data not exist(user == null) user created else send response user already registered.  
     addUser function require from service file and called in this function and pass userData (req.body) data as arguments , In response user status return */
    exports.userRegister = async(req,res)=>{ 
            const user = await service.checkEmail(req.body.email);    
            if(user == null){
                const userData = {
                    name: req.body.name,
                    email: req.body.email,
                    age: req.body.age, 
                    gender: req.body.gender,
                    blood_group: req.body.blood_group,
                    password: md5(req.body.password),  
                    role: "user",
                    phone_number: req.body.phone_number,
                    address: req.body.address,
                    last_donation_date: req.body.last_donation_date,
                    status: "inactive",
                    is_delete: false,
                    created_by: req.body.name
                }
                const data = await service.addUser(userData);
                return res.status(201).json({
                    status: "201",
                    data: data,
                    msg: "User created successfully"
                    
                });      
    }
    else{
        res.json({
            status:"200",
            msg: "User not created",
            error: "user email already registered"
        }); 
    }
    }
    