import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import { unlink } from 'node:fs/promises'
import Video from '#models/video'

export default class AdminVideosController {
    async index({view}:HttpContext ){
        const videos = await Video.query().preload('author').orderBy('created_at', 'desc')
        return view.render('pages/admin/videos', {videos})
    }
        async destroy({params, response, session}: HttpContext){
        const video = await Video.query().where('public_id', params.publicId).firstOrFail();
        await unlink(app.publicPath(video.videoPath))
        await unlink(app.publicPath(video.thumbnailPath))
        await video.delete()
        session.flash('success', 'Vídeo removido')
        return response.redirect().toRoute('admin_videos')
    }
}
