const multer = require('multer')
const moment = require('moment')

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'covers')
  },
  filename: (_req, file, cb) => {
    const name = file.originalname.toLowerCase().split('.')[0]
    name.split(' ').join('_')
    const extension = MIME_TYPE_MAP[file.mimetype]
    cb(null, name + '-' + moment().unix() + '.' + extension)
  }
})

module.exports = multer({ storage }).single('cover')
