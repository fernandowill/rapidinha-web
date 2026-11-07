import type { HttpContext } from '@adonisjs/core/http'


export default class OlasController {
    async index({view }: HttpContext){
        return view.render('pages/ola',{name : "teste ultimate"})
    }
}