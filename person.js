const mongoose = require('mongoose')

const url = 'mongodb://admin:adminpass123@ds223578.mlab.com:23578/fullstackdb'

mongoose.connect(url)
mongoose.Promise = global.Promise;

const Person = mongoose.model('Person', {
    name: String,
    number: String,
    id: String
});

mongoose.model('Person').schema.statics.format = function () {
    const { name, number, id } = this
    return Promise.resolve({
        name,
        number,
        id
    })
}

module.exports = Person
