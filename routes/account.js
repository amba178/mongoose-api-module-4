//GET accounts API.
 
 exports.list = (req, res, next) =>{
 	req.models.Account.list(function(error, accounts) {
 		if(error)return next(error)
 		res.send({accounts: accounts})
 	})
 }

//POST account API 

 exports.add = (req, res, next) =>{
 	if(!req.body) return next( new Error('No account payload'))
 	let account = req.body
 	req.models.Account.create(account, function(error, accountResponse){
 		if(error) return next(error)
 		res.send(`Doc is created: ${accountResponse}`)
 	}) 
 }

 //PUT account API 
  
  exports.edit = (req, res, next)=>{
  	if(!req.params.id) return next(new Error('No account ID'))
  	req.models.Account.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, function(error, account){
  		if(error) return next(error)
 		res.send(`Doc is updated: ${account}`)
  	})
  }

// DELETE account API

exports.del = (req, res, next)=>{
	if(!req.params.id) return next(new Error('No article ID.'));
    req.models.Account.findById(req.params.id, function(error, account) {
    if(error) return next(error);
    if(!account) return next(new Error('article not found'));
    account.remove(function(error, doc){
      if(error) return next(error);
      res.send(`Doc is deleted: ${doc}`);
    })
  })
}
