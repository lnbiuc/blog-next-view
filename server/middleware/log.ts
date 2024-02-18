export default defineEventHandler(event => {
	console.log(event.method + ' ' + event.path);
});
