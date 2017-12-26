const mongoose = require('mongoose')

const accountSechema =  new mongoose.Schema({
    name: { type: String,required: true}, 
    balance: {type: Number, default: 0 }
})

accountSechema.static({
	list: function(callback){
		this.find({}, null, {sort: {_did: -1}}, callback)
	}
})


module.exports = mongoose.model('Account', accountSechema)