//VALIDATION
const Joi = require("joi");

const publishValidation = (data)=>{    


    const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email(),
    heading: Joi.string().min(6).required(),
    article: Joi.string().min(6).required(),
    token:Joi.string()    
    });

    //VALDIDATONG THE DATA
    return schema.validate(data);
}

const loginValidation = (data) =>{    


    const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),    
    });

    //VALDIDATONG THE DATA
    return schema.validate(data);
}

const registerValidation = (data) =>{    


    const schema = Joi.object({
    name:Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),    
    });

    //VALDIDATONG THE DATA
    return schema.validate(data);
}

module.exports.registerValidation = registerValidation; 
module.exports.loginValidation = loginValidation; 
module.exports.publishValidation = publishValidation; 