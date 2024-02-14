import process from 'node:process'
import path from 'node:path'
import fs from 'node:fs'
import COS from 'cos-nodejs-sdk-v5'

export default defineEventHandler(async (event) => {
  console.warn(`start request: ${event.path}`)
  const files = await readMultipartFormData(event)
  if (!files)
    return new Response('Bad Request', { status: 400 })

  const secret_ID = process.env.COS_SECRET_ID
  const secret_KEY = process.env.COS_SECRET_KEY
  console.warn(`===${secret_ID}`)
  console.warn(`===${secret_KEY}`)
  const cos = new COS({
    SecretId: secret_ID as string,
    SecretKey: secret_KEY as string,
  })

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
  // upload to COS
  const date = new Date()
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')

  const key = `/blog/${year}/${month}/${rename}`

  cos.putObject({
    Bucket: 'cdn-1308549476', /* 填入您自己的存储桶，必须字段 */
    Region: 'ap-shanghai', /* 存储桶所在地域，例如 ap-beijing，必须字段 */
    Key: key, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
    StorageClass: 'STANDARD',
    /* 当 Body 为 stream 类型时，ContentLength 必传，否则 onProgress 不能返回正确的进度信息 */
    Body: fs.createReadStream(filePath), // 上传文件对象
    ContentLength: fs.statSync(filePath).size,
  }, (err, data) => {
    if (err) {
      console.error(err)
      return new Response(JSON.stringify(data), { status: 500 })
    }
    console.warn(data)
  })

  return `${process.env.IMAGE_PREVIEW_URI}${key}`
})

function uuidv4() {
  return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c: any) =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16))
}
