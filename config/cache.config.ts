import { caching } from 'cache-manager';

export const cache = await caching('memory', {
  max: 300,
  ttl: 3 * 60 * 1000 // 3h,
});
