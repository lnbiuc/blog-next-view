export default defineEventHandler((event) => {
  console.warn(`${event.method} ${event.path}`)
})
