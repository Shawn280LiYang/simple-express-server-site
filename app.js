var express=require("express");
var app=express();
var logger=require("./logger");
var bodyParser = require('body-parser');
var parserUrlencoded = bodyParser.urlencoded({extended:false});

//data stored here
var blocks={
	'Fixed':'This is Fixed.',
	'Movable':'This is Movable',
	'Rotating':'THis is Rotating'
};

//logger from logger module
app.use(logger);
//serve static files in /public
app.use(express.static('public'));

app.route('/blocks')
	.get(function(request,response){
		response.json(Object.keys(blocks));
	})
	.post(parserUrlencoded,function(request,response){
		var newBlock = request.body;
		blocks[upperLower(newBlock.name)]=newBlock.description;
		response.status(201).json(newBlock.name);
	});

app.route('/blocks/:emma')
	.get(function(request,response){
		var description = blocks[request.blockName];
		if(description){
			response.json(description);
		}else{
			response.status(404).json('Description not found for '+request.params.emma);
		}
	})
	.delete(function(req,res){
		delete blocks[req.blockName];
		res.sendStatus(200);
	});

//parse parameters
app.param('emma',function(request,response,next){
	var rawemma = request.params.emma;
	request.blockName = upperLower(rawemma);
	next();
})



app.listen(3000,function(){
	console.log('Listening on port 3000.');
});

function upperLower(str){
	 return str[0].toUpperCase()+str.slice(1).toLowerCase();
}