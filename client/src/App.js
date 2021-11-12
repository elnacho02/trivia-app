import React, {useState} from "react"
import { Route } from "react-router-dom"
import axios from "axios"


import Login from "./components/Login"
import Navbar from "./components/Navbar"
import Play from "./components/Play/Play";
import Home from "./components/Home/Home";
import Create from "./components/Create";
import Rank from "./components/Rank/Rank";
import './App.css';



function App() {
  var [isLog, setIsLog] = useState([])
  function logVerif(){
     axios("http://localhost:3001/isLog",{withCredentials: "include"}).then(data => setIsLog(data.data))
  }
  return (
   <div className="App"> 
        <Route path={"/"} > <Navbar isLog={isLog} logVerif={logVerif} setIsLog={setIsLog}/> </Route>
        <Route exact path="/login"> <Login/> </Route>
        <Route exact path="/user/create"> <Create /> </Route>
        <Route exact path={["/","/home"]} > <Home isLog={isLog} /> </Route>
        <Route exact path="/play"> <Play/> </Route>
        <Route exact path="/rank"> <Rank /> </Route>
   </div>
  );
}

export default App;
