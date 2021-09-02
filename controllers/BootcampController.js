const Bootcamp = require('../models/BootcampModel.js')

//  @desc     Show ALl Bootcamps
//  @route    GET /api/v1/bootcamps
//  @access   Public
exports.getBootcamps = async (req, res) => {
  try {
    const bootcamps = await Bootcamp.find({})
    if (!bootcamps) {
      res.status(404).json({ success: false, error: 'Bootcamps not found' })
    }
    res.status(200).json({ success: true, count: bootcamps.length, bootcamps })
  } catch (err) {
    res.status(400).json({ success: false, error: err })
  }
}

//  @desc     Show Single Bootcamp
//  @route    GET /api/v1/bootcamps/:id
//  @access   Public
exports.getSingleBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id)
    if (!bootcamp) {
      res.status(404).json({ success: false, error: 'Bootcamp not found' })
    }
    res.status(200).json({ success: true, bootcamp })
  } catch (err) {
    // res.status(400).json({ success: false, error: err })
    next(err)
  }
}

//  @desc     Create a Bootcamp
//  @route    POST /api/v1/bootcamps
//  @access   Private
exports.createBootcamp = async (req, res) => {
  try {
    console.log(req.body)
    const bootcamp = await Bootcamp.create(req.body)
    res.status(201).json({ success: true, data: bootcamp })
  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
}

//  @desc     Update a Bootcamp
//  @route    PUT /api/v1/bootcamps/:id
//  @access   Private
exports.updateBootcamp = async (req, res) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!bootcamp) {
      res.status(404).json({ success: false, error: 'Bootcamp not found' })
    }
    res.status(200).json({ success: true, bootcamp })
  } catch (error) {
    res.status(400).json({ success: false, error })
  }
}

//  @desc     Delete a Bootcamp
//  @route    DELETE /api/v1/bootcamps/:id
//  @access   Private
exports.deleteBootcamp = async (req, res) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)
    if (!bootcamp) {
      res.status(404).json({ success: false })
    }
    res.status(200).json({ success: true, bootcamp: {} })
  } catch (error) {
    res.status(400).json({ success: false, error })
  }
}
