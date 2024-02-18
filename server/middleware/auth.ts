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
		const decoded = jwt.verify(token, 'violet__=');
		if (!decoded) {
			return event.respondWith(new Response('Unauthorized', { status: 401 }));
		}
	}
});
