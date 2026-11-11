import { createVideoValidator } from '#validators/video';
import type { HttpContext } from '@adonisjs/core/http'
import Video from '#models/video';
import app from '@adonisjs/core/services/app';
import string from '@adonisjs/core/helpers/string'
import { unlink } from 'node:fs/promises';

export default class VideosController {
    async create({view }: HttpContext){
        return view.render('pages/videos/create');
    }
    async store({ request, response, auth }: HttpContext) {
        const { title,description, video, thumbnail } = await request.validateUsing(createVideoValidator)
        const publicId = string.random(11)
        const videoName = publicId+ '.' + video.extname
        await video.move(app.publicPath('uploads/videos'), {name: videoName})
        const thumbnailName = publicId+ '.' +thumbnail.extname
        await thumbnail.move(app.publicPath('uploads/thumbnails'), {name: thumbnailName})
        await Video.create({title, publicId ,description,userId: auth.user!.id,videoPath: '/uploads/videos/' + videoName, thumbnailPath: '/uploads/thumbnails/' + thumbnailName})

        return response.redirect().toRoute('video_show', { publicId})
    }
    async show({params, view}: HttpContext){
        const video = await Video.query().where('public_id', params.publicId).preload('author').firstOrFail();
        video.views++
        await video.save()
        return view.render('pages/videos/show', { video })
    }
    async index({request, view}:HttpContext ){
        const q = request.input('q')
        const query = Video.query().preload('author').orderBy('created_at', 'desc')
        if (q){
            query.whereLike('title', '%' + q + '%')
        }
        const videos = await query
        return view.render('pages/videos/index', {videos, q})
    }
    async created({auth, view, request }: HttpContext) {
        const q = request.input('q')
        const query = Video.query().where('user_id', auth.user!.id).orderBy('created_at', 'desc')

        if (q){
            query.whereLike('title', '%' + q + '%')
        }
        const videos = await query
        return view.render('pages/videos/created', {videos, q})
    }
    async destroy({params ,auth, response, session}: HttpContext){
        const video = await Video.query().where('public_id', params.publicId).where('user_id', auth.user!.id).firstOrFail();
        await unlink(app.publicPath(video.videoPath))
        await unlink(app.publicPath(video.thumbnailPath))
        await video.delete()
        session.flash('success', 'Vídeo removido')
        return response.redirect().toRoute('videos_created')
    }
}
