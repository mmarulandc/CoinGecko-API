const jwt = require('jsonwebtoken');
const KEYS = require('../utils/keys');
const UserSchema = require('../models/UserModel');
const mongoose = require('mongoose');
const checkAuth = async (req, res, next) => {

  const token = req.headers.authorization || '';
	if (token) {
    const user = parseToken(token);
    const foundUser = await UserSchema.findOne({ username: user.username, _id: mongoose.Types.ObjectId(user.id) });
		if (foundUser) {
      req.userId = foundUser._id;
			next();
		} else {
			return res.status(401).json({
				message: 'unauthorized',
			});
		}
	} else {
		return res.status(422).json({
			message: 'unauthorized',
		});
	}
};

function parseToken(token) {
	if (token.includes('Bearer')) {
		return jwt.decode(token.split(' ')[1], KEYS.JWT_SECRET_KEY);
	}
	return token;
}

module.exports = checkAuth;
