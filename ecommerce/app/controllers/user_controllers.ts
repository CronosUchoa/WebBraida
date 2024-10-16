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

    return { sucess: `usando index`}

  }

  async newUser({view}: HttpContext){
    return view.render('pages/users/create')
  }

  async create({ request,view }: HttpContext) {
    const payload = request.only(['full_name', 'email','password'])
    await User.create(payload)
    //return response.redirect().toRoute('users.show', { id: sequence })
    return view.render('pages/products/index')
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
