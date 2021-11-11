import { Route } from "react-router-dom"
import Login from "./components/Login"
import Navbar from "./components/Navbar"
import Play from "./components/Play/Play";
import Home from "./components/Home/Home";
import './App.css';


function App() {
  return (
   <div className="App"> 
        <Route exact path="/login"> <Login/> </Route>
        <Route exact path={["/","/play"]} > <Navbar /> </Route>
        <Route exact path={["/","/play"]} > <Home /> </Route>
        <Route exact path="/play"> <Play/> </Route>
   </div>
  );
}

export default App;
