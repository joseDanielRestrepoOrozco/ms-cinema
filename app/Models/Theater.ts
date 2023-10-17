import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, HasOne, hasOne, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Projector from './Projector'
import Seat from './Seat'
import Movie from './Movie'

export default class Theater extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public location: string

  @column()
  public capacity: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Projector, {
    foreignKey: 'theater_id', // defaults to theater_id
  })
  public projector: HasOne<typeof Projector>

  @hasMany(() => Seat, {
    foreignKey: 'theater_id'
  })
  public seats: HasMany<typeof Seat>

  @manyToMany(() => Movie, {
    pivotTable: 'screenings', //nombre tabla pivote
    pivotForeignKey: 'theater_id', //Nombre de la clave que está en esta entidad pero en la tabla pivote
    pivotRelatedForeignKey: 'movie_id', //Nombre de la segunda clave que sirve de pivote en la relacion
    pivotColumns: ['date'] //obtener datos de columnas adicionales
  })
  public movies: ManyToMany<typeof Movie>
}
