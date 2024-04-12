import process from 'node:process'
import { OramaClient } from '@oramacloud/client'

export const orama = new OramaClient({
  endpoint: process.env.ORAMA_API_URL as string,
  api_key: process.env.ORAMA_API_KEY as string,
})
