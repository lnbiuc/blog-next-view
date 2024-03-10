import axios from 'axios';
import process from 'node:process';
// @ts-expect-error miss type
import countryFlagEmoji from 'country-flag-emoji';

export default defineEventHandler(async event => {
	try {
		if (
			!process.env.UMAMI_ADDRESS ||
			!process.env.UMAMI_WEBSITE_ID ||
			!process.env.UMAMI_AUTH_TOKEN
		) {
			return new Response('func disabled, umami env not init', { status: 500 });
		}

		const now = new Date();
		const { data } = await axios.get(
			`${process.env.UMAMI_ADDRESS}/api/websites/${process.env.UMAMI_WEBSITE_ID}/metrics`,
			{
				headers: { Authorization: `Beare ${process.env.UMAMI_AUTH_TOKEN}` },
				params: {
					startAt: now.getTime() - 60 * 1000 * 60,
					endAt: now.getTime(),
					type: 'country',
					limit: 1,
				},
			}
		);
		if (Array.isArray(data) && data.length > 0) {
			const code = data[0].x;
			return countryFlagEmoji.get(code);
		} else {
			return [];
		}
	} catch (error) {
		return new Response(error as string, { status: 500 });
	}
});
