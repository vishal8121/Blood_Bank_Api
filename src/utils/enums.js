const Enum = require('enum')

const messages = new Enum({
     'not_created': "Account not created",
     'registered': "Account created successfully",
     'not_registered': "Account not registered",
     'account_deleted': "Account deleted successfully",
     'password_incorrect': "Password incorrect",
     'login_success': "Login successfully",
     'permission_denied': "Permission denied",
     'update_success': "Updated successfully",
     'email_exists': "Email already exists",
     'data_not_found': "Data not found",
     'all_data': "All data",
     'under_process': "Your request are under processing",
     'login':"Please login",
     'not_exist': "Not Exist",
     'add_data_success': "Data added successfully",
     'enter_data': "Please Enter details"
    })


     module.exports = messages