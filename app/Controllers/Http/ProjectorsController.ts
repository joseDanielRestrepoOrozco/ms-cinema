import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Projector from 'App/Models/Projector'

export default class ProjectorsController {
        //Create
        public async store({ request }: HttpContextContract) {
            let body = request.body()
            const theProjector = await Projector.create(body)
            return theProjector
        }
    
        //Get
        public async index({request}: HttpContextContract){
            const page = request.input('page', 1)
            const perPage = request.input('per_page', 20)
            let projectors:Projector[] = await Projector.query().paginate(page, perPage)
            return projectors
        }
    
        public async show({params}: HttpContextContract){
            return Projector.findOrFail(params.id)
        }
    
        //Update 
        public async update({params, request}: HttpContextContract){
            const body = request.body()
            const theProjector: Projector = await Projector.findOrFail(params.id)
            theProjector.brand = body.brand
            theProjector.high = body.high
            theProjector.width = body.width
            return theProjector.save()
        }
        
        //Delete
        public async destroy({params, response}: HttpContextContract){
            const theProjector: Projector = await Projector.findOrFail(params.id)
            response.status(204)
            return theProjector.delete()
        }
}
