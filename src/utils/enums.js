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
     'enter_data': "Please Enter details",
     'blood_not_available':"Requested blood not available",
     'request_approved':"Your request has been approved. Now you have to make payment for your requested blood",
     'insufficient_balance':"You have entered insufficient amount blood",
     'payment_success':"Payment Completed",
     'payment_failed':"Payment Failed", 
     'valid_pay':"Please enter price accordingly your selected blood group",
     "payment_try":"Payment Failed. Try again...",
     "rejected":"Your request are rejected..Try again",
     "approved":"Request Approved",
     "collected":"Your have successfully donated Blood",
     "not_collected":"Blood not collected",
     "failed_to_authenticate":"Failed to authenticate token",
     "not_authenticated":"Not authenticated",
    })



     module.exports = messages