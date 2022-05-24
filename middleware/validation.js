import joi from 'joi';

// registration validation
export const schema = joi.object({
    username: joi.string().trim().required(),
    email: joi.string().email().trim().lowercase().required(),
    password: joi.string().min(5).required(),
    password_repeat: joi.ref('password')
});

// login validation
export const login_schema = joi.object({
    email: joi.string().email().trim().lowercase().required(),
    password: joi.string().min(5).required()
});