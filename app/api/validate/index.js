const Joi = require('joi'); 

const formSchema = Joi.object().keys({ 
  login: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  password: Joi.string()
    .min(5)
    .max(50)
    .required(),
  password2: Joi.string()
    .min(5)
    .max(50)
    .valid(Joi.ref('password'))
    .required()
    .messages({ 'any.only': `Passwords did not match` }),
  birth: Joi.date()
    .required()
    .greater(Date.now() - 100*365*24*60*60*1000)
    .less(Date.now() - 6*365*24*60*60*1000)
    .messages({
        'date.greater': `Birth date too old`,
        'date.less': `Birth date too young`,
        'any.required': `Birth date is requred`
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
}); 

module.exports = { formSchema };

