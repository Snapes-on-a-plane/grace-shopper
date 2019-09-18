'use strict'

const db = require('../server/db')
const {User, Bubble, Order} = require('../server/db/models')

const bubbles = [
  {
    name: 'i-Tea Kearny',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    rating: 4.2,
    types: ['cafe', 'food', 'point_of_interest', 'establishment'],
    user_ratings_total: 293
  },

  {
    name: 'Sharetea',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    rating: 4.1,
    types: ['cafe', 'food', 'point_of_interest', 'establishment'],
    user_ratings_total: 230
  },
  {
    name: 'Boba Guys',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    rating: 4.4,
    types: ['cafe', 'food', 'point_of_interest', 'establishment'],
    user_ratings_total: 1076
  },
  {
    name: 'Yumyum',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    rating: 4.3,
    types: ['cafe', 'food', 'point_of_interest', 'store', 'establishment'],
    user_ratings_total: 121
  },
  {
    name: 'Black Sugar - Boba Bar',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    rating: 4.7,
    types: ['cafe', 'food', 'point_of_interest', 'establishment'],
    user_ratings_total: 169
  },
  {
    name: 'Qualitea',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    rating: 4.4,
    types: ['cafe', 'food', 'point_of_interest', 'establishment'],
    user_ratings_total: 70
  },
  {
    name: 'Boba Guys Hayes Valley',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    rating: 4.5,
    types: ['cafe', 'food', 'point_of_interest', 'establishment'],
    user_ratings_total: 564
  },
  {
    name: 'Boba Guys Potrero',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    rating: 4.5,
    types: ['cafe', 'food', 'point_of_interest', 'establishment'],
    user_ratings_total: 371
  },
  {
    name: 'Boba Guys NOPA',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    rating: 4.6,
    types: ['cafe', 'food', 'point_of_interest', 'establishment'],
    user_ratings_total: 117
  },
  {
    name: 'Boba Guys Mission',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    rating: 4.5,
    types: ['cafe', 'food', 'point_of_interest', 'establishment'],
    user_ratings_total: 762
  }
]

const orders = [
  {
    name: 'Pearl Milk Tea',
    totalPrice: '5.50'
  },
  {
    name: 'Bubble Milk Tea',
    totalPrice: '5.75'
  },
  {
    name: 'Black Pearl Milk Tea',
    totalPrice: '5.50'
  },
  {
    name: 'Foam Red Tea',
    totalPrice: '6.00'
  },
  {
    name: 'Foam Milk Tea',
    totalPrice: '5.75'
  },
  {
    name: 'Tea Pearl',
    totalPrice: '5.25'
  },
  {
    name: 'Brown Sugar Milk Tea',
    totalPrice: '6.50'
  },
  {
    name: 'Mango Milk Tea',
    totalPrice: '5.75'
  },
  {
    name: 'Green Milk Tea',
    totalPrice: '6.00'
  },
  {
    name: 'Taro Milk Tea',
    totalPrice: '5.50'
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')
  await Promise.all(
    bubbles.map(bubble => {
      return Bubble.create(bubble)
    })
  )
  await Promise.all(
    orders.map(order => {
      return Order.create(order)
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
