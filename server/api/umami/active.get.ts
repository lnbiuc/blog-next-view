import axios from 'axios';
import process from 'node:process';

export default defineEventHandler(async event => {
	try {
		if (
			!process.env.UMAMI_ADDRESS ||
			!process.env.UMAMI_WEBSITE_ID ||
			!process.env.UMAMI_AUTH_TOKEN
		) {
			return new Response('func disabled, umami env not init', { status: 500 });
		}

		const { data } = await axios.get(
			`${process.env.UMAMI_ADDRESS}/api/websites/${process.env.UMAMI_WEBSITE_ID}/active`,
			{
				headers: { Authorization: `Beare ${process.env.UMAMI_AUTH_TOKEN}` },
			}
		);
		if (data) {
			return data[0].x;
		} else {
			return new Response('error when get active user', { status: 500 });
		}
	} catch (error) {
		return new Response(error as string, { status: 500 });
	}
});
