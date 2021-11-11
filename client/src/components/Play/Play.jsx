
import React, {useState, useEffect} from 'react'
import axios from "axios"
import s from "./Play.module.css"
import Pregunta from '../Pregunta/Pregunta'
import GameOver from '../GameOver/GameOver'

 function Play() {
    var [points, setPoints] = useState(0)
    var [preguntas,setPreguntas] = useState([])
    var [i, setI] = useState(0)
    var [go,setGo] = useState(1)
   
    async function getPreg(){ 
        await axios("http://localhost:3001/preguntas",{withCredentials: true}).then(x=>setPreguntas(x.data));
        setI(0)
        setPoints(0)
    }

    useEffect(() => {
        getPreg()
    },[])
    
     function handlePoints(){
        axios("http://localhost:3001/points/"+points,{withCredentials: true})
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
             <span>{i+1}/10</span>
        </div>
    )
    else return(
        <div>
            <button type="" onClick={()=>setGo(2)}>START</button>
        </div>
    )
}

export default Play
