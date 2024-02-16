import { useScheduler } from '#scheduler';
import { updateFriendScreenShotTask, updateArticleObImageTask } from '~/server/task';

export default defineNitroPlugin(() => {
	startScheduler();
});

function startScheduler() {
	const scheduler = useScheduler();

	scheduler
		.run(() => {
			console.warn('cool beans! I run once a second! 😀');
			updateFriendScreenShotTask();
		})
		.dailyAt(0, 22);

	scheduler
		.run(() => {
			console.warn('cool beans! I run once a second! 😀');
			updateArticleObImageTask();
		})
		.dailyAt(1, 3);

	scheduler
		.run(() => {
			console.warn('cool beans! I run once a second! 😀');
		})
		.everyMinutes(1);
	// create as many tasks as you want here
}
