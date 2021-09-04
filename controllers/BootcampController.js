const ErrorResponse = require('../utils/ErrorResponse')
const asyncHandler = require('../middleware/async')
const Bootcamp = require('../models/BootcampModel')

//  @desc     Show ALl Bootcamps
//  @route    GET /api/v1/bootcamps
//  @access   Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamps = await Bootcamp.find({})
  res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps })
})

//  @desc     Show Single Bootcamp
//  @route    GET /api/v1/bootcamps/:id
//  @access   Public
exports.getSingleBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id)
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp with id of ${req.params.id} not found.`),
      404
    )
  }
  res.status(200).json({ success: true, data: bootcamp })
})

//  @desc     Create a Bootcamp
//  @route    POST /api/v1/bootcamps
//  @access   Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body)
  res.status(201).json({ success: true, data: bootcamp })
})

//  @desc     Update a Bootcamp
//  @route    PUT /api/v1/bootcamps/:id
//  @access   Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp with id of ${req.params.id} not found.`),
      404
    )
  }
  res.status(200).json({ success: true, data: bootcamp })
})

//  @desc     Delete a Bootcamp
//  @route    DELETE /api/v1/bootcamps/:id
//  @access   Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)
  if (!bootcamp) {
    new ErrorResponse(`Bootcamp with id of ${req.params.id} not found.`)
  }
  res.status(200).json({ success: true, data: {} })
})
