/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'
import router from '@adonisjs/core/services/router'

router.get('/', [controllers.Videos, 'index']).as('home')

router
  .group(() => {
    router.get('signup', [controllers.NewAccount, 'create'])
    router.post('signup', [controllers.NewAccount, 'store'])

    router.get('login', [controllers.Session, 'create'])
    router.post('login', [controllers.Session, 'store'])
  })
  .use(middleware.guest())

router
  .group(() => {
    router.post('logout', [controllers.Session, 'destroy'])
    router.get('videos/create', [controllers.Videos, 'create']).as('videos_create')
    router.post('videos', [controllers.Videos, 'store'])
  })
  .use(middleware.auth())

router
  .group(() => {
    router.get('admin/users', [controllers.Users, 'index']).as('admin_users')
  })
  .use([middleware.auth(), middleware.admin()])

router.get('videos/:publicId', [controllers.Videos, 'show']).as('video_show')
