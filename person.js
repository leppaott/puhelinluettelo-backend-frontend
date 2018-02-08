const mongoose = require('mongoose')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const url = process.env.MONGODB_URI

mongoose.connect(url)
mongoose.Promise = global.Promise;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: String
})

personSchema.statics.format = function (person) {
  const { name, number, id } = person

  return {
    name,
    number,
    id
  }
}

module.exports = mongoose.model('Person', personSchema)
