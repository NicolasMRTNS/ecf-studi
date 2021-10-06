const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  birthDate: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  role: { type: String, required: true, default: 'not-validated-user' }
})

export default mongoose.model('User', UserSchema)
