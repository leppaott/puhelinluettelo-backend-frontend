import { callbackify } from 'util';

const mongoose = require('mongoose')

const url = 'mongodb://admin:adminpass123@ds223578.mlab.com:23578/fullstackdb'

mongoose.connect(url)
mongoose.Promise = global.Promise;

const Person = mongoose.model('Person', {
    name: String,
    number: String,
    id: String
});

mongoose.model('Person').schema.statics.format = function (person, cb) {
    const { name, number, id } = person

    cb(new Person({
        name,
        number,
        id
    }))
}

module.exports = Person
