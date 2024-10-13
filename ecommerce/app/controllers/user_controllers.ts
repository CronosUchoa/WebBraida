import  { HttpContext } from '@adonisjs/core/http'
import User from "../models/user.js"
import Product from '#models/product'



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

  async update({ params, request }: HttpContext) {
    console.log(params.id)
    const user = await User.findOrFail(params.id)
    const payload = await request.only(['full_name','email','password'])
    user.merge(payload)
    await user.save()

    return user

  }

  async delete({params }: HttpContext ) {
    const user = await User.findOrFail(params.id)
    await user.delete()
    return { sucess: `${params.id} removido`}

  }
}
