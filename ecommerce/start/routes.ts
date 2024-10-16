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

router.get('/', async ({ view }) => {
  return view.render('pages/products/index')
})

//apenas um teste
router.post('/login', ({ request }) => {
  console.log(request.all())
  return 'FIZ LOGIN'
})

router
  .group(() => {
    router.get('/', [UsersController, 'index']).as('user.index')
    router.patch('/:id', [UsersController, 'update']).as('update')
    router.post('/', [UsersController, 'create']).as('create')
    router.delete('/:id', [UsersController, 'delete']).as('delete')
    router.get('/new', [UsersController, 'newUser']).as('newUser')
  })
  .prefix('users')
  .as('users')

router.get('/products', [ProductsController, 'index']).as('products.index')
router.get('/products/new', [ProductsController, 'create']).as('products.create')
router.get('/products/:id', [ProductsController, 'show']).as('products.show')
router.post('/products', [ProductsController, 'store']).as('products.store')
router.delete('/products/:id', [ProductsController, 'destroy']).as('products.destroy')
router.patch('/products/:id', [ProductsController, 'patch']).as('products.patch')
