const { body, validationResult } = require('express-validator');

const validator = [
    body('name').notEmpty().withMessage("username canot be null")
    .isLength({ min: 4, max: 20 }).withMessage("length is to minimum"),

    body('lastName').notEmpty().withMessage('lastname cannot be null'),

    body('email').isNumeric().withMessage("must be a valid mobile number"),

    body('password').isLength({ min: 5 }).withMessage("minimumlength is 5"),

    body('reEnterPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("password didn't match");
        }
        return true;
    })
]



module.exports = {validator}
