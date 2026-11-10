import { createVideoValidator } from '#validators/video';
import type { HttpContext } from '@adonisjs/core/http'
import Video from '#models/video';
import app from '@adonisjs/core/services/app';
import string from '@adonisjs/core/helpers/string'

export default class VideosController {
    async create({view }: HttpContext){
        return view.render('pages/videos/create');
    }
    async store({ request, response, auth }: HttpContext) {
        const { title,description, video, thumbnail } = await request.validateUsing(createVideoValidator)
        const videoName = string.uuid()+ '.' + video.extname
        await video.move(app.publicPath('uploads/videos'), {name: videoName})
        const thumbnailName = string.uuid()+ '.' +thumbnail.extname
        await thumbnail.move(app.publicPath('uploads/thumbnails'), {name: thumbnailName})
        await Video.create({title, description,userId: auth.user!.id,videoPath: '/uploads/videos/' + videoName, thumbnailPath: '/uploads/thumbnails/' + thumbnailName})

    
        return response.redirect().toRoute('dashboard')
    }
}