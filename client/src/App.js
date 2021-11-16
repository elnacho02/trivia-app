import React, {useState} from "react"
import { Route } from "react-router-dom"
import Login from "./components/Login"
import Navbar from "./components/Navbar"
import Play from "./components/Play/Play";
import Home from "./components/Home/Home";
import Create from "./components/Create";
import Rank from "./components/Rank/Rank";
import './App.css';
import axios from "axios"



function App() {
  var [isLog, setIsLog] = useState([])
  function logVerif(){
      axios("https://trivia-app01.herokuapp.com/isLog",{
            method: "post",
            data: {
                      token: localStorage.getItem("token")
                  }
          })
          .then(data => setIsLog(data.data))
          .then(console.log(isLog, "isLog"))
  }
  return (
   <div className="App"> 
        <Route path={"/"} > <Navbar isLog={isLog} logVerif={logVerif} setIsLog={setIsLog}/> </Route>
        <Route exact path="/login"><Login/></Route>
        <Route exact path="/user/create"> <Create /> </Route>
        <Route exact path={["/","/home"]} > <Home isLog={isLog} /> </Route>
        <Route exact path="/play"> <Play/> </Route>
        <Route exact path="/rank"> <Rank /> </Route>
   </div>
  );
}

export default App;
