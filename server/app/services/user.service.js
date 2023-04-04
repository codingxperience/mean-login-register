const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const jwtConfig = require('../../config/jwt.config');
const User = require('../models/user.model');

exports.login = ({ username, password }) => {
	return new Promise(async (resolve, reject) => {
		const user = await User.findOne({ username });
		if (user && bcrypt.compareSync(password, user.hash)) {
			const { hash, ...userWithoutHash } = user.toObject();
			const token = jwt.sign({ sub: user.id }, jwtConfig.secret);
			resolve({ ...userWithoutHash, token });
		}
	})
}

exports.getAll = async () => {
	return await User.find().select('-hash');
}

exports.getById = async (id) => {
	return await User.findById(id).select('-hash');
}

exports.create = async (userParam) => {
	// validate
	if (await User.findOne({ username: userParam.username })) {
		throw 'Username "' + userParam.username + '" is already taken';
	}
	const user = new User(userParam);
	// hash password
	if (userParam.password) {
		user.hash = bcrypt.hashSync(userParam.password, 10);
	}
	// save user
	await user.save();
}

exports.update = async (id, userParam) => {
	const user = await User.findById(id);
	// validate
	if (!user) throw 'User not found';
	if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
		throw 'Username "' + userParam.username + '" is already taken';
	}
	// hash password if it was entered
	if (userParam.password) {
		userParam.hash = bcrypt.hashSync(userParam.password, 10);
	}
	// copy userParam properties to user
	Object.assign(user, userParam);
	await user.save();
}

exports._delete = async (id) => {
	await User.findByIdAndRemove(id);
}