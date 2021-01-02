const UserSchema = require('../../models/UserModel');

const signup = async (req, res) => {
	const { name, lastname, username, password, favoriteCurrency } = req.body;
	const newUser = new UserSchema({
		name: name,
		lastname: lastname,
		username: username,
		password: password,
		favoriteCurrency: favoriteCurrency,
	});
	try {
		const userExists = await UserSchema.findOne({ username: username });
		if(userExists) {
			return res.status(409).json({message: 'There is a user with the same username'});
		}
		await newUser.save();
		return res.status(200).json({
			message: 'The user has been registered sucsessfully',
		});
	} catch (err) {
		console.error(err.message);
		return res.status(500).json({
			message: 'Something went wrong, try later',
		});
	}
};

module.exports = signup;
