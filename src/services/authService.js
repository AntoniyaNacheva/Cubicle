const User = require('../models/User');

exports.getUserByUsername = (username) => User.findOne({ username });

exports.register = (username, password) => User.create({ username, password });

exports.login = async (username, password) => {
	const user = await this.getUserByUsername(username);

	const isValid = await user.validatePassword(password);
	if(!user || !isValid) {
		throw 'Invalid username or password!';
	}
	// if(!(user && user.validatePassword(password))) {
	// 	throw 'Invalid username or password!';
	// }    !a || !b === !(a && b)

	return user;
}