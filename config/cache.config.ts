import { caching } from 'cache-manager';

export const cache = await caching('memory', {
	max: 300,
	ttl: 12 * 60 * 1000, // 12h,
});
