const Enum = require('enum')

const messages = new Enum({
     'registered': "Account created successfully",
     'not_registered': "Account not registered",
     'account_deleted': "Account deleted successfully",
     'password_incorrect': "Password incorrect",
     'login_success': "Login successfully",
     'permission_denied': "Permission denied",
     'update_success': "Update successfully",
     'email_exists': "Email already exists",
     'data_not_found': "Data not found",
     'all_data': "All data",
     'under_process': "Your request are under processing",
     'login':"Please login",
     'not_exist': "Not Exist"
    })


     module.exports = messages