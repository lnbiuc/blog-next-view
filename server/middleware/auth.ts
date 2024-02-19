import jwt from 'jsonwebtoken';

export default defineEventHandler(event => {
	// return event.respondWith(new Response('Unauthorized', { status: 401 }));
	const needAuth = [
		'/api/article/create',
		'/api/article/update',
		'/api/friend/create',
		'/api/friend/screenshot',
		'/api/friend/update',
		'/api/upload',
	];

	if (needAuth.includes(event.path)) {
		const token = event.headers.get('Authorization');
		if (!token) {
			return event.respondWith(new Response('Unauthorized', { status: 401 }));
		}
		const secretKey = process.env.JWT_SECRET_KEY;
		if (!secretKey) {
			return event.respondWith(new Response('jwt secretKey is required', { status: 500 }));
		} else {
			const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
			if (!decoded) {
				return event.respondWith(new Response('Unauthorized', { status: 401 }));
			}
		}
	}
});
