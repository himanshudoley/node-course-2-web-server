const express = require('express');
const hbs=require('hbs');
const fs=require('fs');

const port=process.env.PORT || 3000;
var app=express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs'); //handlebars


app.use(express.static(__dirname+'/public'));

app.use((req,res,next)=>{
	var now=new Date().toString();
	var log='${now}: ${req.method} ${req.url}';
	console.log(log);
	fs.appendFile('server.log',log+ '\n',(err)=>{
		if(err){
			console.log('unable to append to server.log.')
		}
	});
	next();
});



hbs.registerHelper('getCurrentyear',()=>{
	return new Date().getFullYear()
})

hbs.registerHelper('screamIt',(text)=>{
	return text.toUpperCase();
})

app.get('/',(req,res)=>{
	res.render('home.hbs',{
		pagetitle: 'home page',
		welcomemessage: 'welcome to my message',
		//currentyear: new Date().getFullYear()
	});		//handlebars
});

app.get('/about',(req,res)=>{
	res.render('about.hbs',{
		pagetitle: 'About page',
		//currentyear: new Date().getFullYear()
	});		//handlebars
});

app.get('/projects',(req,res)=>{
	res.render('projects.hbs',{
		pagetitle:'Projects'
	});
});

app.listen(port,()=>{
	console.log('server is up on port');
});




























