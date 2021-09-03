const ErrorResponse = require('../utils/ErrorResponse')
const Bootcamp = require('../models/BootcampModel')

//  @desc     Show ALl Bootcamps
//  @route    GET /api/v1/bootcamps
//  @access   Public
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find({})
    res
      .status(200)
      .json({ success: true, count: bootcamps.length, data: bootcamps })
  } catch (err) {
    next(err)
  }
}

//  @desc     Show Single Bootcamp
//  @route    GET /api/v1/bootcamps/:id
//  @access   Public
exports.getSingleBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id)
    if (!bootcamp) {
      return next(
        new ErrorResponse(`Bootcamp with id of ${req.params.id} not found.`),
        404
      )
    }
    res.status(200).json({ success: true, data: bootcamp })
  } catch (err) {
    next(err)
  }
}

//  @desc     Create a Bootcamp
//  @route    POST /api/v1/bootcamps
//  @access   Private
exports.createBootcamp = async (req, res, next) => {
  try {
    console.log(req.body)
    const bootcamp = await Bootcamp.create(req.body)
    res.status(201).json({ success: true, data: bootcamp })
  } catch (err) {
    next(err)
  }
}

//  @desc     Update a Bootcamp
//  @route    PUT /api/v1/bootcamps/:id
//  @access   Private
exports.updateBootcamp = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error)
  }
}

//  @desc     Delete a Bootcamp
//  @route    DELETE /api/v1/bootcamps/:id
//  @access   Private
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)
    if (!bootcamp) {
      return res.status(404).json({ success: false })
    }
    res.status(200).json({ success: true, data: {} })
  } catch (error) {
    next(error)
  }
}
