const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieparser = require('cookie-parser');
const session = require('express-session');

const axios = require("axios").default


const app = express();
app.use(session(
	{
	  name: 'sid',
	  secret:'secret', // Debería estar en un archivo de environment
	  resave:false,
	  saveUninitialized:false,
	  cookie:{
		  maxAge: 1000 * 60 * 60 * 2 // Está en milisegundos --> 2hs
	  }
	}
  ));
const users = [
	{id: 1, username: 'nacho', email: 'nacho@mail.com', password: 'nacho'},
	{id: 2, username: 'pepe', email: 'pepe@mail.com', password: 'pepe'}
  ]

app.use(express.json());
app.use(cors({
	origin : "http://localhost:3000",
	credentials: true, 
  }))

app.use(express.urlencoded({ extended: true }));

app.use(cookieparser());



app.use((req, res, next) => {
 	console.log(req.session.userId, "desde app.use");
  	next();
});

const redirectLogin = (req, res, next) => {
	if(!req.session.userId) {
	  res.json({msj: "redirecting"});
	} else {
	  next();
	}
  }
  const redirectHome = (req, res, next) => {
	if(req.session.userId) {
	  return res.json({redirect: '/home', msj: "Ya estás logueado"});
	} else {
	  next();
	}
  }
  
  
mongoose.connect('mongodb+srv://nacho:nacho123@cluster0.ok4gh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
	useNewUrlParser: true, 
	useUnifiedTopology: true 
}).then(() => console.log("Connected to MongoDB")).catch(console.error);

// Models

const Users = require("./models/Users");


app.get('/isLog',(req,res)=>{
	console.log(req.session.userId, "desde get isLog")
	 res.json({isLog: req.session.userId})
})


app.get('/preguntas', async (req, res) => {
	var preg = await axios("https://opentdb.com/api.php?amount=3&type=multiple")
				.then(x => x.data.results)

	res.send(preg);
});
app.get('/login', redirectHome, (req, res) => {
  	res.json({redirect: '/login'})
  });

app.post('/user/create',  (req, res) => {
	const newUser = new Users({
		username: req.body.username,
		password: req.body.password
	})
	
	newUser.save();
	res.json(newUser);
});
app.get("/points/:point", async (req,res)=>{
	if(!req.session.userId) return res.send("noId")
	const user = await Users.findById(req.session.userId)
	if(user.highScore < req.params.point){
		const up = await Users.findByIdAndUpdate(req.session.userId, {highScore: req.params.point})
		up.save()
	}
	res.send(req.params.point)
})

app.post('/login', redirectHome, async (req, res) => {
	const { username, password } = req.body;

  	if(username && password) {
    const user = await Users.findOne({username: req.body.username, password: req.body.password}).lean()
	
    if(user) {
		req.session.userId = user._id;
		return res.json({redirect: '/'})
    }
  }

  res.json({redirect: '/login'})
  });

  app.post('/logout', (req, res) => {
	req.session.destroy(err => {
	  if(err) {
		return res.json({redirect:'/home'});
	  }
	  res.clearCookie('sid');
	  res.json({redirect:'/login'})
	})
  });


/* app.delete('/todo/delete/:id', async (req, res) => {
	const result = await Todo.findByIdAndDelete(req.params.id);

	res.json({result});
});*/



/*app.put('/todo/update/:id', async (req, res) => {
	const todo = await Todo.findById(req.params.id);

	todo.text = req.body.text;

	todo.save();

	res.json(todo);
}); */

/* app.get('/preguntas', redirectLogin, async (req, res) => {
	if(req.query.search){
		const perName = await Case.find({ accused: req.query.search })
		const perTitle = await Case.find({ title: req.query.search })
		console.log( perName, perTitle)
		return res.json(perTitle)
	}
	const cases = await Case.find();

	res.send(cases);
}); */


app.listen(3001, console.log("on port 3001"));