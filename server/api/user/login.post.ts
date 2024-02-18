import jwt from 'jsonwebtoken';

export default defineEventHandler(async event => {
	try {
		const body = await readBody(event);
		const nickname = body.nickname;
		const password = body.password;
		const res = await UserSchema.findOne({ nickname, password }, '_id, nickname');
		if (res) {
			const token = jwt.sign({ _id: res._id, nickname: res.nickname }, 'violet__=');
			return { code: 200, msg: 'login success', token: token, res };
		}
		return { code: 400, msg: 'login failed' };
	} catch (error) {
		return error;
	}
});
