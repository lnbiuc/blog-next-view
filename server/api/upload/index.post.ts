import process from 'node:process'
import axios from 'axios'
import { getFileHash } from '~/composables/fileUpload'

export default defineEventHandler(async (event) => {
  console.warn(`start request: ${event.path}`)
  const body = await readMultipartFormData(event)
  if (!body)
    return new Response('Bad Request', { status: 400 })

  const filename = body[0].filename
  const file = body[0].data

  if (!file || !filename)
    return new Response('Bad Request', { status: 400 })

  console.warn(`start upload: ${filename}`)
  const date = new Date()
  const year = date.getFullYear()
  const month = (`0${date.getMonth() + 1}`).slice(-2)
  const fileHash = await getFileHash(file)
  const extension = filename.split('.').pop()
  const filePath = `${process.env.R2_UPLOAD_URI}/${year}/${month}/${fileHash}.${extension}`
  const previewPath = `${process.env.IMAGE_PREVIEW_URI}/${year}/${month}/${fileHash}.${extension}`
  console.warn(`upload to: ${filePath}`)

  const blob = new Blob([file])

  const fileObj = new File([blob], filename, { type: 'text/plain' })

  console.warn(fileObj)

  const { data, status } = await axios.put(filePath, {
    body: fileObj,
  })

  console.warn(`upload data: ${data}`)
  if (status === 200)
    return previewPath

  else
    return new Response('upload error', { status: 500 })
})
