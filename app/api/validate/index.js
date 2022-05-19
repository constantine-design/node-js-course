const { celebrate, Joi, errors, Segments } = require('celebrate');

const formSchema = Joi.object().keys({ 
  login: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
    .messages({
      'string.min': `Minimum login length 3 symblos`,
      'string.max': `Maximum login length 30 symblos`,
      'any.required': `Login is requred`
    }),
  password: Joi.string()
    .min(5)
    .max(50)
    .required()
    .messages({ 
      'any.only': `Passwords should match and be beetween 5-50 symbols` 
    }),
  password2: Joi.string()
    .min(5)
    .max(50)
    .valid(Joi.ref('password'))
    .required()
    .messages({ 
      'any.only': `Passwords should match and be beetween 5-50 symbols` 
    }),
  birth: Joi.date()
    .required()
    .greater(Date.now() - 100*365*24*60*60*1000) // years*days*hours*min*second*milisecond
    .less(Date.now() - 6*365*24*60*60*1000)  // years*days*hours*min*second*milisecond
    .messages({
        'date.greater': `Birth date too old`,
        'date.less': `Birth date too young`,
        'any.required': `Birth date is requred`
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .messages({ 
      'any.only': `Invalid email` 
    }),
}); 

const formValidation = celebrate({  
  [Segments.BODY]: formSchema 
});

const mwValidation = (req, res, next) => {
  const result = formSchema.validate(req.body);
  if (result.error) req.notvalidated = result.error.details[0].message;
  next();
}

module.exports = { formSchema, formValidation, mwValidation };

