import { OramaClient } from '@oramacloud/client';
import process from 'node:process';

export const orama = new OramaClient({
	endpoint: process.env.ORAMA_API_URL as string,
	api_key: process.env.ORAMA_API_KEY as string,
});
