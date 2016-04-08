
var express = require("express");
var router = express.Router();

var bodyParser = require('body-parser');
var parserUrlencoded = bodyParser.urlencoded({extended:false});

//data stored here
var blocks={
	'Fixed':'This is Fixed.',
	'Movable':'This is Movable',
	'Rotating':'THis is Rotating'
};

router.route('/')
	.get(function(request,response){
		response.json(Object.keys(blocks));
	})
	.post(parserUrlencoded,function(request,response){
		var newBlock = request.body;
		blocks[upperLower(newBlock.name)]=newBlock.description;
		response.status(201).json(newBlock.name);
	});

router.route('/:emma')
	//parse parameters
	.all(function(request,response,next){
		var rawemma = request.params.emma;
		request.blockName = upperLower(rawemma);
		next();
	})
	.get(function(request,response){
		var description = blocks[request.blockName];
		if(description){
			response.json(description);
		}else{
			response.status(404).json('Description not found for '+request.blockName);
		}
	})
	.delete(function(req,res){
		delete blocks[req.blockName];
		res.sendStatus(200);
	});

function upperLower(str){
	 return str[0].toUpperCase()+str.slice(1).toLowerCase();
}
module.exports = router;