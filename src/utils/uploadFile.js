const { ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage')
const storage = require('../config/firebase.js')
const sharp = require('sharp')

async function uploadFile (file) {
  // eslint-disable-next-line prefer-const
  let fileBuffer = await sharp(file.buffer)
    .resize({ width: 256, height: 256, fit: 'cover' })
    .toBuffer()

  const fileRef = ref(storage, `files/${file.originalname} ${Date.now()}`)

  const fileMetaData = {
    contentType: file.mimetype
  }

  const fileUploadPromise = uploadBytesResumable(
    fileRef,
    fileBuffer,
    fileMetaData
  )

  await fileUploadPromise

  const fileDownloadURL = await getDownloadURL(fileRef)

  return { ref: fileRef, downloadURL: fileDownloadURL }
}

module.exports = uploadFile
