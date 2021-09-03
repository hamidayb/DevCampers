const ErrorResponse = require('../utils/errorResponse')

const errorHandler = (err, req, res, next) => {
  let error = { ...err }
  error.message = err.message

  console.log(err)

  // Mongoose invalid ObjectId
  if (err.name === 'CastError') {
    const message = `Bootcamp with id of ${err.value} not found.`
    error = new ErrorResponse(message, 404)
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered'
    error = new ErrorResponse(message, 400)
  }

  // Mongoose duplicate key
  if (err.name === 'ValidationsError') {
    const message = Object.values(err.errors).map((val) => val.message)
    error = new ErrorResponse(message, 400)
  }

  res.status(err.statusCode || 500).json({
    success: false,
    error: error.message || 'ServerError',
  })
}

module.exports = errorHandler
