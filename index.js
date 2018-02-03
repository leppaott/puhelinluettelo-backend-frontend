const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))

//3.10
morgan.token('data',  (req, res) => JSON.stringify(req.body))

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

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)
    res.status(204).end()
})

app.post('/api/persons/', (req, res) => {
    const person = {
        ...req.body, 
        id: 100 + Math.floor(Math.random() * Math.floor(9999999))
    }
    
    const error = (msg) => res.status(404).send({error: msg})
    if (!person.name || !person.name.length)
        return error('name missing')
    if (!person.number || !person.number.length)
        return error('number missing')
    if(persons.find(p => p.number === person.number))
        return error('number has been used')

    return ((persons = [...persons, person]), res.json(person))
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    const info = '<div style=\"margin-bottom: 20px;\">puhelinluettelossa '
                     + persons.length + ' henkilön tiedot</div>' +
                 '<div>' + new Date().toString() + '</div>'
    res.send(info)
})


app.listen(process.env.PORT || 3003)