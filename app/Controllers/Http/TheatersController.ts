import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Theater from 'App/Models/Theater'

export default class TheatersController {
    //Create
    public async store({ request }: HttpContextContract) {
        let body = request.body()
        const theTheater = await Theater.create(body)
        return theTheater
    }

    //Get
    public async index({ request }: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        let theaters: Theater[] = await Theater.query().preload('projector').paginate(page, perPage)
        return theaters
    }

    public async show({ params }: HttpContextContract) {
        let theTheater: Theater = await Theater.query().where("id", params.id).preload('projector').preload('seats').preload('movies').firstOrFail();
        return theTheater;
    }

    public async show2({ params }: HttpContextContract) {
        let theTheater: Theater = await Theater.query().where("id", params.id).preload('projector').preload('seats').firstOrFail()
        const movies = await theTheater.related('movies').query()
        const screenings = movies.map((movie) => {
            return {
                "date": movie.$extras.pivot_date,
                "movie": movie.toJSON()
            }
        })
        return { ...theTheater.toJSON(), "screenings": screenings };
    }

    //Update 
    public async update({ params, request }: HttpContextContract) {
        const body = request.body()
        const theTheater: Theater = await Theater.findOrFail(params.id)
        theTheater.location = body.location
        theTheater.capacity = body.capacity
        return theTheater.save()
    }

    //Delete
    public async destroy({ params, response }: HttpContextContract) {
        const theTheater: Theater = await Theater.findOrFail(params.id)
        response.status(204)
        return theTheater.delete()
    }
}
