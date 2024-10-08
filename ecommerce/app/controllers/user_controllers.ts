import  { HttpContext } from '@adonisjs/core/http'
import User from "../models/user.js"



export default class UsersController {
  async index({ request }: HttpContext) {

    const page = request.input('page', 1)
    const payload = request.only(['name'])
    const query = User.query()

    if (payload.name && payload.name.length > 0) {
      query.where('name', 'like', `%${payload.name}%`)
    }
    const users = await query.paginate(page)

    

    return users

  }

  async create({ request }: HttpContext) {
    const payload = request.only(['full_name', 'email','password'])
    const user = await User.create(payload)


    //return response.redirect().toRoute('users.show', { id: sequence })
    return user
  }

  async show({ params }: HttpContext) {
    const id = params.id

    if (id === null) {

      return { message: 'id eh obrigatorio' }
    }
    const user = await User.findByOrFail(params.id)

    if(user !== null){
      return user
    }


    return { message: 'not found' }
  }
}
