const User = require('../models/User');
const config = require('../config');
const jwt = require('../lib/jsonwebtoken');

exports.getUserByUsername = (username) => User.findOne({ username });

exports.register = (username, password) => User.create({ username, password });

exports.login = async (username, password) => {
	const user = await this.getUserByUsername(username);

	const isValid = await user.validatePassword(password);
	if (!user || !isValid) {
		throw 'Invalid username or password!';
	}
	// if(!(user && user.validatePassword(password))) {
	// 	throw 'Invalid username or password!';
	// }    !a || !b === !(a && b)

	const payload = { _id: user._id, username: user.username };
	const token = await jwt.sign(payload, config.SECRET, { expiresIn: '2h' });

	return token;
}