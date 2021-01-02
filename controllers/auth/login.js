const UserSchema = require('../../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const KEYS = require('../../utils/keys');

const login = async (req, res, next) => {
	const { username, password } = req.body;
	try {
		const userExists = await UserSchema.findOne({ username: username });
		if (!userExists) {
			return res.status(401).json({ message: 'This user does not exist' });
		}
		const isCorrectPassword = await bcrypt.compare(password, userExists.password);
		if (!isCorrectPassword) {
			return res.status(401).json({ message: 'Password does not match' });
		}
		const token = jwt.sign({ username: userExists.username, id: userExists._id }, KEYS.JWT_SECRET_KEY, {
			expiresIn: "1h",
		});
		return res.status(200).json({ token });
	} catch (error) {
		console.log(`Ha ocurrido un error ${error.message}`);
		return res.status(500).json({ message: 'something went wrong, try again' });
	}
};

module.exports = login;
