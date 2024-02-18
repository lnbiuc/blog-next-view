import process from 'node:process';
import path from 'node:path';
import fs from 'node:fs';
import { uploadToR2, getFileHashSync, uuidv4 } from '~/composables/fileUpload';

export default defineEventHandler(async event => {
	const files = await readMultipartFormData(event);
	if (!files) return new Response('Bad Request', { status: 400 });

	// upload to public folder
	const localPath: string[] = [];
	const file = files[0];
	const filename = file.filename;
	if (!file || !filename) return new Response('Bad Request', { status: 400 });
	const extension = filename.split('.').pop();
	const rename = `${uuidv4()}.${extension}`;
	const filePath = path.join(process.cwd(), 'public', rename);
	fs.writeFileSync(filePath, file.data);
	localPath.push(filePath);
	const hash = getFileHashSync(filePath);
	const hashName = `${hash}.${extension}`;
	// upload to COS
	return uploadToR2(filePath, hashName, 'blog');
});
