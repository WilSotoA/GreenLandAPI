const app = require('./app')
const PORT = process.env.PORT || 3001
const { db } = require('./database/config')
const seedDatabase = require('./database/seeder')

db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
    return db.sync({ force: true })
  })
  .then(() => {
    console.log('Database has been synced, the models are synced.')
    return seedDatabase()
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err)
  })

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
