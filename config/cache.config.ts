import { caching } from 'cache-manager'

export const cache = await caching('memory', {
  max: 300,
  ttl: 24 * 60 * 1000 * 7, // 7d,
})
