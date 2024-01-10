import { body, validationResult } from "express-validator"


export const validateRegistration = async (req, res, next) => {

    // 1. setup rules
    const rules = [
        body('name').trim().notEmpty().withMessage("Name cannot be empty"),
        body('email').isEmail().withMessage("Please enter valid email"),
        body('password').isLength({ min: 6 }).withMessage("Password must be 6 characters long")
    ];

    // run rules for all requests
    await Promise.all(rules.map((rule) => rule.run(req)));

    // result
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       return res.send(errors.array());
    }

    next();

}

export const validateLogin = async (req, res, next) => {

    // 1. setup rules
    const rules = [
        body('email').isEmail().withMessage("Please enter valid email"),
        body('password').isLength({ min: 6 }).withMessage("Password must be 6 characters long")
    ];

    // run rules for all requests
    await Promise.all(rules.map((rule) => rule.run(req)));

    // result
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        res.send(errors.array());
    }

    next();

}
