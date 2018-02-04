const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const Person = require('./person')

app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))

//3.10
morgan.token('data', (req, res) => JSON.stringify(req.body))

app.use(morgan((tokens, req, res) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens['data'](req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
    ].join(' ')
}))//morgan('tiny')) 

let persons = [{
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    }, {
        name: "Martti Tienari",
        number: "050-2223456",
        id: 2
    }, {
        name: "Arto Järvinen",
        number: "066-123123",
        id: 3
    }, {
        name: "Lea Kutvonen",
        number: "044-666686",
        id: 4
    }
]

persons.forEach(p => new Person(p).save())

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    Person.findOne({ id }).then(person => {
        if (person) {
            res.json(Person.format(person))
        } else {
            res.status(404).end()
        }
    })
})

app.put('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    Person.findOneAndUpdate({ id }, req.body)
        .then(person => res.status(404).end())
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    Person.findOneAndRemove({ id })
        .then(person => res.status(204).end())
})

app.post('/api/persons/', (req, res) => {
    const person = new Person({
        ...req.body, //very unsafe
        id: 100 + Math.floor(Math.random() * Math.floor(9999999))
    })

    const error = (msg) => res.status(404).send({ error: msg })

    if (!person.name || !person.name.length)
        return error('name missing')
    if (!person.number || !person.number.length)
        return error('number missing')

    Person.find({})
        .then(persons => {
            if (persons.find(p => p.number === person.number))
                return error('number has been used')

            person.save().then(saved => res.json(Person.format(saved)))
        })
})

app.get('/api/persons', (req, res) => {
    Person.find({})
        .then(persons => res.json(persons.map(Person.format)))
})

app.get('/info', (req, res) => {
    Person.find({})
        .then(persons => {
            const info = '<div style=\"margin-bottom: 20px;\">puhelinluettelossa '
                + persons.length + ' henkilön tiedot</div>' +
                '<div>' + new Date().toString() + '</div>'
            res.send(info)
        })
})

app.listen(process.env.PORT || 3003)