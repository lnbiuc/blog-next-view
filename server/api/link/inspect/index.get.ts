import process from 'node:process';
import puppeteer from 'puppeteer';
import { getFileHashSync, uuidv4, uploadToR2 } from '~/composables/fileUpload';
import fs from 'node:fs';
import path from 'node:path';
import { ScreenshotSchema } from '~/server/models/screenshot.schema';
import { IScreenshot } from '~/server/types';

export default defineEventHandler(async event => {
	const { url } = getQuery(event);
	if (!url) return new Response('Bad Request, url require', { status: 400 });

	const exist = (await ScreenshotSchema.findOne({ url: url })) as IScreenshot;

	if (exist && exist.updatedAt) {
		const updateTime = exist.updatedAt;
		const now = new Date();
		const timeDiff = now.getTime() - updateTime.getTime();

		const oneDay = 24 * 60 * 60 * 1000;

		if (timeDiff <= 7 * oneDay) {
			return exist.filePath; // 7天以内
		}
	}

	let browser;
	try {
		// const endpoint = 'violet-browserless.zeabur.app';
		const endpoint = process.env.SCREEN_URL;
		if (!endpoint) {
			return new Response('SCREEN_URL is null, func disabled', { status: 400 });
		}

		browser = await puppeteer.connect({
			browserWSEndpoint: `ws://${endpoint}`,
			defaultViewport: { width: 1600, height: 900 },
		});

		const page = await browser.newPage();
		// page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'dark' }]);
		await page.goto(url as string);

		const file = await page.screenshot({
			type: 'webp',
			quality: 25,
			clip: {
				width: 1600,
				height: 900,
				x: 0,
				y: 0,
				scale: 0.5,
			},
		});

		browser.close();

		const publicDir = path.join(process.cwd(), 'public');
		const filePath = path.join(publicDir, `${uuidv4()}.png`);

		// 将 fs.writeFile 包装成 Promise
		const writeFilePromise = new Promise((resolve, reject) => {
			fs.writeFile(filePath, file, 'binary', err => {
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
		if (exist) {
			exist.filePath = previewUrl as string;
			ScreenshotSchema.updateOne(exist);
		} else {
			ScreenshotSchema.create({ url, filePath: previewUrl });
		}
		return previewUrl;
	} catch (error) {
		if (browser) {
			browser.close();
		}
		return new Response(error as string, { status: 500 });
	}
});
