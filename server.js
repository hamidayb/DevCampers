const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors')
// Route Files
const BootcampRoutes = require('./routes/bootcampRoutes.js')
// Middleware Files
const errorHandler = require('./middleware/errorMiddleware')
// Config Files
const connectDB = require('./config/db.js')

dotenv.config({ path: './config/config.env' })
connectDB()

const app = express()
app.use(express.json())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// routes
app.use('/api/v1/bootcamps', BootcampRoutes)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  )
)

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red)
  server.close(() => process.exit(1))
})
