const expressJwt = require('express-jwt');
const jwtConfig = require('../../config/jwt.config');
const userService = require('../services/user.service');

let isRevoked = async (req, payload, done) => {
	const user = await userService.getById(payload.sub);
	if (!user) {
		return done(null, true);
	}
	done();
};

exports.jwt = () => {
	const secret = jwtConfig.secret;
	return expressJwt({ secret, isRevoked }).unless({
		path: [
			'/users/loginMe',
			'/users/registerMe',
			'/users'
		]
	});
}

