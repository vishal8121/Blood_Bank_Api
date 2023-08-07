const Enum = require('enum')

const STATUS_CODE = new Enum({
    SUCCESS: 200,
    CREATED: 201,
    NOT_FOUND:404,
    EXCEPTION_ERROR : 400,
    Internal_Server_Error:500,
    Unauthorized:401,
    FORBIDDEN:403,
    SERVICE_UNAVAILABLE:503,
    PAYMENT_REQUIRED:402
})


module.exports = STATUS_CODE 
