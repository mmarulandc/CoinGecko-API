const { body, validationResult } = require('express-validator');

const signupChecks = () => {
	return [
		body('username').notEmpty().withMessage('username must not be empty'),
		body('password').isLength({ min: 5 }).withMessage('Password must to have at leat 5 characters'),
		body('name').notEmpty().withMessage('name must not be empty'),
		body('lastname').notEmpty().withMessage('lastname must not be empty'),
		body('favoriteCurrency').notEmpty(),
	];
};

const loginChecks = () => {
	return [
		body('username').notEmpty().withMessage('The username must no be empty'),
		body('password').notEmpty().withMessage('The password must no be empty'),
	];
};

const validate = (req, res, next) => {
	const errors = validationResult(req);
	if (errors.isEmpty()) {
		return next();
	}
	const extractedErrors = [];
	errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
	return res.status(400).json({
		errors: extractedErrors,
	});
};

module.exports = { signupChecks, loginChecks, validate };
