const mongoose = require('mongoose')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const url = process.env.MONGODB_URI

mongoose.connect(url)
mongoose.Promise = global.Promise;

const Person = mongoose.model('Person', {
  name: String,
  number: String,
  id: String
});

if (process.argv.length > 2) {
  const [name, number] = process.argv.slice(2, 4)
  const person = new Person({
    name,
    number,
    id: name
  })
  console.log('lisätään henkilö', name, 'numero', number, 'luetteloon')
  person.save().then(response => mongoose.connection.close())
} else {
  Person.find({})
    .then(persons => {
      console.log(persons.reduce((acc, cur) => {
        return acc + '\n' + cur.name + ' ' + cur.number
      }, 'puhelinluettelo:'))
    })
    .then(() => mongoose.connection.close())
}
