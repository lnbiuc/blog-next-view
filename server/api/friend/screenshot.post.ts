import axios from 'axios';
import process from 'node:process';
import path from 'node:path';
import fs from 'node:fs';
import { getFileHashSync, uuidv4, uploadToR2 } from '~/composables/fileUpload';

export default defineEventHandler(async event => {
	const body = await readBody(event);
	if (!body) return new Response('Bad Request, url require', { status: 400 });
	const url = body.url;
	try {
		const endpoint = process.env.SCREEN_URL;
		if (!endpoint) {
			return new Response('SCREEN_URL is null, func disabled', { status: 400 });
		}

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
						const previewUrl = uploadToR2(filePath, `${fileHash}.png`, 'screenshot');
						console.log('previewUrl:', previewUrl);
						resolve(previewUrl);
					}
				});
			});

			// 等待写入操作完成，并返回 previewUrl
			const previewUrl = await writeFilePromise;
			return previewUrl;
		}
	} catch (error) {
		return new Response(error as string, { status: 500 });
	}
});
