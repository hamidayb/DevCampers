const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
// Route Files
const BootcampRoutes = require('./routes/bootcampRoutes.js')

dotenv.config({ path: './config/config.env' })

const app = express()

// middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// routes
app.use('/api/v1/bootcamps', BootcampRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () =>
  console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`)
)
