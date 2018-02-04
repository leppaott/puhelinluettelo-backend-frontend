const mongoose = require('mongoose')

const url = 'mongodb://admin:adminpass123@ds223578.mlab.com:23578/fullstackdb'

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

const Person = mongoose.model('Person', personSchema);

module.exports = Person
