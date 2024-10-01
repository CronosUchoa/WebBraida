/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const UsersController = () => import('../app/controllers/user_controllers.js')
const ProductsController = () => import('../app/controllers/products_controller.js')

router
  .group(() => {
    router.get('/', [UsersController, 'index']).as('lista')
    router.get('/:id', [UsersController, 'show']).where('id', router.matchers.number()).as('show')
    router.post('/', [UsersController, 'create']).as('create')
  })
  .prefix('users')
  .as('users')

router.get('/products', [ProductsController, 'index']).as('products.index')
router.get('/products/:id', [ProductsController, 'show']).as('products.show')
