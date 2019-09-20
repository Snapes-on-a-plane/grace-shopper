'use strict'

const db = require('../server/db')
const {User, BubbleTea, Order, Order_BubbleTea} = require('../server/db/models')

const bubbleTeas = [
  {
    name: 'i-Tea Kearny',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    rating: 4.2,
    price: 350,
    //types: ['cafe', 'food', 'point_of_interest', 'establishment'],
    user_ratings_total: 293
  },

  {
    name: 'Sharetea',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    rating: 4.1,
    price: 450,
    //types: ['cafe', 'food', 'point_of_interest', 'establishment'],
    user_ratings_total: 230
  },
  {
    name: 'Boba Guys',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    rating: 4.4,
    price: 400,
    //types: ['cafe', 'food', 'point_of_interest', 'establishment'],
    user_ratings_total: 1076
  },
  {
    name: 'Yumyum',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    picture:
      'http://planomagazine.com/wp-content/uploads/2018/10/Vivi-Bubble-Tea-Pic-Vivi-Plano-Magazine-bear-1.jpg',
    rating: 4.3,
    price: 380,
    //types: ['cafe', 'food', 'point_of_interest', 'store', 'establishment'],
    user_ratings_total: 121
  },
  {
    name: 'Black Sugar - Boba Bar',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    picture:
      'https://www.straitstimes.com/sites/default/files/styles/article_pictrure_780x520_/public/articles/2018/10/09/nz-bubbletea-091019.jpg?itok=24L0kqFn&timestamp=1539070627',
    rating: 4.7,
    price: 410,
    //types: ['cafe', 'food', 'point_of_interest', 'establishment'],
    user_ratings_total: 169
  },
  {
    name: 'Qualitea',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    picture: 'https://data.whicdn.com/images/258483196/large.jpg',
    rating: 4.4,
    price: 390,
    //types: ['cafe', 'food', 'point_of_interest', 'establishment'],
    user_ratings_total: 70
  },
  {
    name: 'Boba Guys Hayes Valley',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    picture: 'https://pbs.twimg.com/media/DcDN-8zU0AEtdLX.jpg',
    rating: 4.5,
    price: 420,
    //types: ['cafe', 'food', 'point_of_interest', 'establishment'],
    user_ratings_total: 564
  },
  {
    name: 'Boba Guys Potrero',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    picture:
      'https://imbibemagazine.com/wp-content/uploads/2017/06/boba-guys-drinks1-crdt-carolyn-fong.jpg',
    rating: 4.5,
    price: 350,
    //types: ['cafe', 'food', 'point_of_interest', 'establishment'],
    user_ratings_total: 371
  },
  {
    name: 'Boba Guys NOPA',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    picture:
      'https://danielfooddiary.com/wp-content/uploads/2017/12/Bobaguys-1.jpg',
    rating: 4.6,
    price: 400,
    //types: ['cafe', 'food', 'point_of_interest', 'establishment'],
    user_ratings_total: 117
  },
  {
    name: 'Boba Guys Mission',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    rating: 4.7,
    price: 390,
    //types: ['cafe', 'food', 'point_of_interest', 'establishment'],
    user_ratings_total: 762
  }
]

const orders = [
  {
    totalQuantity: 0
  },
  {
    totalQuantity: 0
  },
  {
    totalQuantity: 0
  }
]

const order_BubbleTea = [
  {
    orderId: 1,
    bubbleTeaId: 2,
    bubbleTeaQuantity: 2
  },
  {
    orderId: 1,
    bubbleTeaId: 4,
    bubbleTeaQuantity: 1
  },
  {
    orderId: 2,
    bubbleTeaId: 1,
    bubbleTeaQuantity: 3
  },
  {
    orderId: 2,
    bubbleTeaId: 3,
    bubbleTeaQuantity: 2
  },
  {
    orderId: 2,
    bubbleTeaId: 6,
    bubbleTeaQuantity: 1
  },
  {
    orderId: 3,
    bubbleTeaId: 5,
    bubbleTeaQuantity: 1
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')
  await Promise.all(
    bubbleTeas.map(bubbleTea => {
      return BubbleTea.create(bubbleTea)
    })
  )
  await Promise.all(
    orders.map(order => {
      return Order.create(order)
    })
  )
  await Promise.all(
    order_BubbleTea.map(item => {
      return Order_BubbleTea.create(item)
    })
  )

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  console.log(`seeded {users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
