import { createVideoValidator } from '#validators/video'
import type { HttpContext } from '@adonisjs/core/http'
import Video from '#models/video'
import app from '@adonisjs/core/services/app'
import string from '@adonisjs/core/helpers/string'
import { unlink } from 'node:fs/promises'

export default class VideosController {
  async index({ request, view }: HttpContext) {
    const q = request.input('q')
    const query = Video.query().preload('author').orderBy('created_at', 'desc')

    if (q) {
      const termo = q.replace(/[\\%_]/g, (c: string) => '\\' + c)
      query.whereRaw(`title LIKE ? ESCAPE '\\'`, [`%${termo}%`])
    }

    const videos = await query
    return view.render('pages/videos/index', { videos, q })
  }

  async create({ view }: HttpContext) {
    return view.render('pages/videos/create')
  }

  async store({ request, response, auth }: HttpContext) {
    const { title, description, video, thumbnail } =
      await request.validateUsing(createVideoValidator)

    const publicId = string.random(11)
    const videoName = publicId + '.' + video.extname
    const thumbnailName = publicId + '.' + thumbnail.extname

    await video.move(app.publicPath('uploads/videos'), { name: videoName })
    await thumbnail.move(app.publicPath('uploads/thumbnails'), { name: thumbnailName })

    try {
      await Video.create({
        title,
        publicId,
        description,
        userId: auth.user!.id,
        videoPath: '/uploads/videos/' + videoName,
        thumbnailPath: '/uploads/thumbnails/' + thumbnailName,
      })
    } catch (error) {
      await unlink(app.publicPath('uploads/videos', videoName)).catch(() => {})
      await unlink(app.publicPath('uploads/thumbnails', thumbnailName)).catch(() => {})
      throw error
    }

    return response.redirect().toRoute('video_show', { publicId })
  }

  async show({ params, view }: HttpContext) {
    const video = await Video.query()
      .where('public_id', params.publicId)
      .preload('author')
      .firstOrFail()

    video.views++
    await video.save()

    return view.render('pages/videos/show', { video })
  }
}
