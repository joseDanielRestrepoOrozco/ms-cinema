import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Seat from 'App/Models/Seat'

export default class SeatsController {
    //Create
    public async store({ request }: HttpContextContract) {
        let body = request.body()
        const theSeat = await Seat.create(body)
        return theSeat
    }

    //Get
    public async index({ request }: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        let seats: Seat[] = await Seat.query().paginate(page, perPage)
        return seats
    }

    public async show({ params }: HttpContextContract) {
        return Seat.findOrFail(params.id)
    }

    //Update 
    public async update({ params, request }: HttpContextContract) {
        const body = request.body()
        const theSeat: Seat = await Seat.findOrFail(params.id)
        theSeat.location = body.location
        theSeat.reclining = body.reclining
        return theSeat.save()
    }

    //Delete
    public async destroy({ params, response }: HttpContextContract) {
        const theSeat: Seat = await Seat.findOrFail(params.id)
        response.status(204)
        return theSeat.delete()
    }
}
