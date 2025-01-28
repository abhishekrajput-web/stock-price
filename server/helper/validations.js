import Joi from "joi";

// register schema
const registerSchema = Joi.object({
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match",
  }),
  dateOfBirth: Joi.date().iso().required(),
  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone number must be 10 digits",
    }),
  address: Joi.string().min(5).required(),
  image: Joi.string().uri().required(),
  otp: Joi.string().length(6).required().messages({
    "string.empty": "OTP is required",
    "string.length": "OTP must be 6 digits long",
  }),
});


// login schema
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});


// update profile schema
const updateProfileSchema = Joi.object({
    userId: Joi.string().required(),
    firstName: Joi.string().min(2).max(50),
    lastName: Joi.string().min(2).max(50),
    email: Joi.string().email(),
    phone: Joi.string().pattern(/^[0-9]{10}$/),
    address: Joi.string().max(200),
    image: Joi.string().uri(), // Ensure image URL is valid
  });
  

//  changeuserschema
  const changeStatusSchema = Joi.object({
    userId: Joi.string().required(),
    status: Joi.string().valid("approved", "rejected").required(),
  });


  
//  ids schema
  const idSchema = Joi.object({
    id: Joi.string().required(),
  });


  // Define Joi schemas for validation
const sendOtpSchema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.empty": "Email is required",
      "string.email": "Invalid email format",
    }),
  });
  

  const verifyOtpSchema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.empty": "Email is required",
      "string.email": "Invalid email format",
    }),
    otp: Joi.string().length(6).required().messages({
      "string.empty": "OTP is required",
      "string.length": "OTP must be 6 digits long",
    }),
  });



  export {registerSchema, loginSchema, updateProfileSchema, changeStatusSchema, idSchema, sendOtpSchema, verifyOtpSchema};