import { FriendSchema } from '~/server/models/friend.schema';
import { IArticle, IFriend } from '~/server/types';
import axios from 'axios';
import process from 'node:process';
import path from 'node:path';
import fs from 'node:fs';
import { getFileHashSync, uuidv4, upload } from '~/composables/fileUpload';
import { ArticleSchema } from '~/server/models/article.schema';

export async function updateFriendScreenShotTask() {
	console.warn('-====-=-=-----updateFriendScreenShotTaskRunning-====-=-=-----start==');
	const friends: IFriend[] = await FriendSchema.find({ status: 'PUBLISHED' });

	const endpoint = process.env.SCREEN_URL;
	if (!endpoint) {
		return new Response('SCREEN_URL is null, func disabled', { status: 400 });
	}

	friends.forEach(async (friend: IFriend) => {
		const url = friend.url;

		const response = await axios.get(`${endpoint}/take`, {
			params: {
				url: url,
				'viewport-width': 1200,
				'viewport-height': 600,
				width: 1600,
				'max-height': 900,
				'delay-ms': 3000,
			},
			responseType: 'arraybuffer',
		});

		if (response.headers['content-type'] === 'image/png') {
			const publicDir = path.join(process.cwd(), 'public');
			const filePath = path.join(publicDir, `${uuidv4()}.png`);
			console.warn('save screen to :', filePath);

			// 将 fs.writeFile 包装成 Promise
			const writeFilePromise = new Promise((resolve, reject) => {
				fs.writeFile(filePath, response.data, 'binary', err => {
					if (err) {
						console.error('save screen fail', err);
						reject(err);
					} else {
						const fileHash = getFileHashSync(filePath);
						console.warn('file hash:', fileHash);
						const previewUrl = upload(filePath, `${fileHash}.png`);
						console.log('previewUrl:', previewUrl);
						resolve(previewUrl);
					}
				});
			});

			// 等待写入操作完成，并返回 previewUrl
			const previewUrl = await writeFilePromise;
			friend.screenShot = previewUrl as string;
			const res = await FriendSchema.findByIdAndUpdate(friend._id, friend, { new: true });
			console.log('res:', res);

			console.warn('update friend screenShot:', friend.title);
		}
	});
}

export async function updateArticleObImageTask() {
	console.warn('-====-=-=-----updateArticleObImageTaskRunning-====-=-=-----start==');
	const articles: IArticle[] = await ArticleSchema.find({ status: 'PUBLISHED' }, { content: 0 });
	const endpoint = process.env.SCREEN_URL;
	if (!endpoint) {
		return new Response('SCREEN_URL is null, func disabled', { status: 400 });
	}
	articles.forEach(async article => {
		const url = `https://vio.vin/og/${article.shortLink}`;

		const response = await axios.get(`${endpoint}/take`, {
			params: {
				url: url,
				'viewport-width': 1200,
				'viewport-height': 600,
				width: 1600,
				'max-height': 900,
				'delay-ms': 3000,
			},
			responseType: 'arraybuffer',
		});

		if (response.headers['content-type'] === 'image/png') {
			const publicDir = path.join(process.cwd(), 'public');
			const filePath = path.join(publicDir, `${uuidv4()}.png`);
			console.warn('save screen to :', filePath);

			// 将 fs.writeFile 包装成 Promise
			const writeFilePromise = new Promise((resolve, reject) => {
				fs.writeFile(filePath, response.data, 'binary', err => {
					if (err) {
						console.error('save screen fail', err);
						reject(err);
					} else {
						const fileHash = getFileHashSync(filePath);
						console.warn('file hash:', fileHash);
						const previewUrl = upload(filePath, `${fileHash}.png`);
						console.log('previewUrl:', previewUrl);
						resolve(previewUrl);
					}
				});
			});

			// 等待写入操作完成，并返回 previewUrl
			const previewUrl = await writeFilePromise;
			article.ogImage = previewUrl as string;
			const res = await ArticleSchema.findByIdAndUpdate(
				article._id, // 指定要更新的文章的 _id
				{ ogImage: article.ogImage } // 只包含要更新的字段
			);
			console.log('res:', res);

			console.warn('update article ogImage:', article.title);
		}
	});
}
