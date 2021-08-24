exports.getBootcamps = (req, res) => {
  res.status(200).json({ success: true, msg: `Show all bootcamps` })
}

exports.getSingleBootcamp = (req, res) => {
  res.status(200).json({ success: true, msg: `Show bootcamp ${req.params.id}` })
}

exports.createBootcamp = (req, res) => {
  res.status(201).json({ success: true, msg: `Create new bootcamp` })
}

exports.updateBootcamp = (req, res) => {
  res
    .status(202)
    .json({ success: true, msg: `Update bootcamp ${req.params.id}` })
}

exports.deleteBootcamp = (req, res) => {
  res
    .status(202)
    .json({ success: true, msg: `Delete bootcamp ${req.params.id}` })
}
