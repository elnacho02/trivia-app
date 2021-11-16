const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieparser = require('cookie-parser');
const dotenv = require("dotenv")
const axios = require("axios").default
const jwt = require("jsonwebtoken")

dotenv.config()
const app = express();
app.use(express.json());


const PORT = process.env.PORT || 3001

mongoose.connect(process.env.CONNECTION_URL, {
	useNewUrlParser: true, 
	useUnifiedTopology: true 
}).then(() => console.log("Connected to MongoDB")).catch(console.error);



app.use(cors())
app.use(express.urlencoded({ extended: true }));

app.use(cookieparser());
app.get("/", (req,res)=>{
	res.send("hello to trivia api")
})


// Models

const Users = require("./models/Users");


app.post('/isLog', async (req,res)=>{
	const { token } = req.body
	var user = jwt.verify(token, "secret")
	if(user){
		var userDb = await Users.findById(user.id).lean();
		return res.send(userDb)
	 }
	 else return res.send(false)
})


app.get('/preguntas', async (req, res) => {
	var preg = await axios("https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple")
				.then(x => x.data.results)

	res.send(preg);
});
app.get('/ranking', async (req, res) => {
	var rank = await Users.find().sort({highScore:-1}).limit(10)
	res.send(rank);
});


app.post('/user/create',  (req, res) => {
	const newUser = new Users({
		username: req.body.username,
		password: req.body.password
	})
	
	newUser.save();
	res.json(newUser);
});
app.post("/points", async (req,res)=>{
	const { token, points } = req.body
	var user = jwt.verify(token, "secret")
	if(!user.id) return res.send("noId")
	
	const userDb = await Users.findById(user.id)
	if(userDb.highScore < points){
		const up = await Users.findByIdAndUpdate(user.id, {highScore: points})
		up.save()
	}
	res.send(points)
})

app.post('/login', async (req, res) => {
	const { username, password } = req.body;

  	if(username && password) {
    const user = await Users.findOne({username: req.body.username, password: req.body.password}).lean()
	
    if(user) {
		/* req.session.userId = user._id; */
		const token = jwt.sign({
			id: user._id
		},"secret")
		return res.json({redirect: '/', token: token})
    }
  }

  res.json({redirect: '/login'})
  });

  app.get('/logout', (req, res) => {
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


app.listen(PORT, console.log("on port 3001"));