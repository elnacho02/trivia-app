
import React, {useState, useEffect} from 'react'
import axios from "axios"
import s from "./Play.module.css"
import Pregunta from '../Pregunta/Pregunta'
import GameOver from '../GameOver/GameOver'
import PrePlay from '../PrePlay/PrePlay'

 function Play() {
    var [points, setPoints] = useState(0)
    var [preguntas,setPreguntas] = useState([])
    var [i, setI] = useState(0)
    var [go,setGo] = useState(1)
   
    async function getPreg(){ 
        await axios("https://trivia-app01.herokuapp.com/preguntas").then(x=>setPreguntas(x.data));
        setI(0)
        setPoints(0)
    }

    useEffect(() => {
        getPreg()
    },[])
    
     function handlePoints(){
        axios("https://trivia-app01.herokuapp.com/points/",{
            method: "post",
            data: {
                      token: localStorage.getItem("token"),
                      points: points
                  }
          })
    }
    

    if(preguntas.length && i >= preguntas.length) {
        handlePoints()
        return(
            <GameOver points={points} getPreg={getPreg}/>
        )
    }
    else if(preguntas.length && go === 2) return (
        <div className={s.container}>
             <div className={s.preguntas}>
                <Pregunta  preg={preguntas[i]} setI={setI} i={i} points={points} setPoints={setPoints}/>
             </div>
             <div className={s.contador}>
                <i class={i+1 >= 1 ? "fas fa-circle" : "far fa-circle"}></i>
                <i class={i+1 >= 2 ? "fas fa-circle" : "far fa-circle"}></i>
                <i class={i+1 >= 3 ? "fas fa-circle" : "far fa-circle"}></i>
                <i class={i+1 >= 4 ? "fas fa-circle" : "far fa-circle"}></i>
                <i class={i+1 >= 5 ? "fas fa-circle" : "far fa-circle"}></i>
                <i class={i+1 >= 6 ? "fas fa-circle" : "far fa-circle"}></i>
                <i class={i+1 >= 7 ? "fas fa-circle" : "far fa-circle"}></i>
                <i class={i+1 >= 8 ? "fas fa-circle" : "far fa-circle"}></i>
                <i class={i+1 >= 9 ? "fas fa-circle" : "far fa-circle"}></i>
                <i class={i+1 >= 10 ? "fas fa-circle" : "far fa-circle"}></i>
             </div>
        </div>
    )
    else return(
        <PrePlay setGo={setGo} />
    )
}

export default Play
