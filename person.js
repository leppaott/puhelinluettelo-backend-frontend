const mongoose = require('mongoose')

const url = 'mongodb://admin:adminpass123@ds223578.mlab.com:23578/fullstackdb'

mongoose.connect(url)
mongoose.Promise = global.Promise;

const Person = mongoose.model('Person', {
    name: String,
    number: String,
    id: String
});

module.exports = Person
