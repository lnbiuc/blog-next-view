import process from 'node:process'
import path from 'node:path'
import fs from 'node:fs'
import crypto from 'node:crypto'
import { upload } from '~/composables/fileUpload'

export default defineEventHandler(async (event) => {
  console.warn(`start request: ${event.path}`)
  const files = await readMultipartFormData(event)
  if (!files)
    return new Response('Bad Request', { status: 400 })

  // upload to public folder
  const localPath: string[] = []
  const file = files[0]
  const filename = file.filename
  if (!file || !filename)
    return new Response('Bad Request', { status: 400 })
  const extension = filename.split('.').pop()
  const rename = `${uuidv4()}.${extension}`
  const filePath = path.join(process.cwd(), 'public', rename)
  fs.writeFileSync(filePath, file.data)
  localPath.push(filePath)
  const hash = getFileHashSync(filePath)
  const hashName = `${hash}.${extension}`
  // upload to COS
  return upload(filePath, hashName)
})

function uuidv4() {
  return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c: any) =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16))
}

function getFileHashSync(filePath: string, algorithm = 'sha256') {
  try {
    const hash = crypto.createHash(algorithm)

    const data = fs.readFileSync(filePath)

    hash.update(data)

    return hash.digest('hex')
  }
  catch (err) {
    console.error('获取文件哈希值时出错:', err)
    return null
  }
}
