import vine from '@vinejs/vine'

export const createVideoValidator = vine.create({
  title: vine.string().maxLength(100),
  description: vine.string().nullable(),
  video: vine.file({ size: '20mb', extnames: ['mp4', 'webm', 'mov'] }),
  thumbnail: vine.file({ size: '2mb', extnames: ['jpg', 'jpeg', 'png', 'webp'] }),
})
