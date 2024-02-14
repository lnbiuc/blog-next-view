import crypto from 'node:crypto'
import type Buffer from 'node:buffer'

export async function getFileHash(file: Buffer): Promise<string> {
  if (!crypto)
    throw new Error('Web Crypto API is not supported in this browser.')

  const hashBuffer = await crypto.subtle.digest('SHA-256', await file)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('')

  return hashHex
}
