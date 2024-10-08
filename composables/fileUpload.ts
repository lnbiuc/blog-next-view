import process from 'node:process'
import fs from 'node:fs'
import crypto from 'node:crypto'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import * as Minio from 'minio'

// @ts-expect-error no type
import mimeTypes from 'mime-types'

export function uploadToR2(filePath: string, filename: string, dir: string) {
  const endpoint = process.env.R2_UPLOAD_ENDPOINT
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

  if (!endpoint || !accessKeyId || !secretAccessKey)
    return

  const client = new S3Client({
    region: 'auto',
    endpoint,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  })

  const date = new Date()
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')

  const key = `${dir}/${year}/${month}/${filename}`
  const fileExtension = filename.split('.').pop()
  const contentType = mimeTypes.contentType(fileExtension) // 获取文件对应的 ContentType

  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: key,
    Body: fs.createReadStream(filePath),
    ContentType: contentType,
  })

  return client
    .send(command)
    .then((res) => {
      console.warn(res)
      return `${process.env.IMAGE_PREVIEW_URI}/${key}`
    })
    .catch((err) => {
      console.warn(err)
      throw err
    })
    .finally(() => {
      fs.unlink(filePath, () => {
        console.warn('delete temp file: ', filePath)
      })
    })
}

export function uploadToMinIo(filePath: string, filename: string, dir: string) {
  console.warn(filePath)
  const endpoint = process.env.MINIO_ENDPOINT
  const accessKeyId = process.env.MINIO_ACCESS_KEY
  const secretAccessKey = process.env.MINIO_SECRET_KEY
  const bucket = process.env.MINIO_BUCKET_NAME

  if (!endpoint || !accessKeyId || !secretAccessKey || !bucket)
    return

  const client = new Minio.Client({
    port: 9000,
    // useSSL: true,
    endPoint: endpoint,
    accessKey: accessKeyId,
    secretKey: secretAccessKey,
  })

  const date = new Date()
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const fileExtension = filename.split('.').pop()
  const contentType = mimeTypes.contentType(fileExtension)

  const key = `${dir}/${year}/${month}/${filename}`

  const metaData = {
    'Content-Type': contentType,
  }

  client.fPutObject(bucket, key, filePath, metaData)
    .then((res) => {
      console.warn(res)
    })
    .catch((err) => {
      console.warn(err)
      throw err
    })
    .finally(() => {
      fs.unlink(filePath, () => {
        console.warn('delete temp file: ', filePath)
      })
    })
}

export function getFileHashSync(filePath: string, algorithm = 'sha256') {
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

export function uuidv4() {
  return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c: any) =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16))
}
