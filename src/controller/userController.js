    const service = require("../services/user")
    const md5 = require('md5');
   
    /*
     @Params : req and res
     @Request : req.body
     @Response : request status in json format with status code
     @Description : userRegister function request data from user. addUser function require from service file and called in this function and pass req.body data as arguments , In response user status return */
    exports.userRegister = async(req,res)=>{ 
        const data = await service.addUser({
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
          })
        res.status(201).json({
            status: "201",
            data: data,
            msg: "User created successfully"
        });
       
    }
    