const express = require('express')
const mongoose = require('mongoose')
const logger = require('morgan')
const models = require('./models')
const errorhandler = require('errorhandler')
const bodyParser = require('body-parser')
const routes = require('./routes')

mongoose.Promise = global.Promise 
mongoose.connect('mongodb://localhost:27017/mongoose-db', {useMongoClient: true})


let app = express() 

app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(logger('dev'))
app.use(errorhandler())


app.use((req, res, next) =>{
	if(!models.Account) return next(new Error("No models"))
	req.models = models 
 	return next()
})

// REST API routes
app.get('/accounts', routes.account.list)
app.post('/accounts', routes.account.add)
app.put('/accounts/:id', routes.account.edit)
app.delete('/accounts/:id', routes.account.del)

app.listen(3000)