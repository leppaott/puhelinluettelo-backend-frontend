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
    const promise = new mongoose.Promise;
    if (callback) promise.addBack(cb);
        promise.resolve.bind(promise)(null, {
            name,
            number,
            id
        })

    return promise

    return Promise.resolve({
        name,
        number,
        id
    })
}

module.exports = Person
