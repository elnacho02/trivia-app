import React, {useState, useEffect} from 'react';
import s from "./Pregunta.module.css"


function Pregunta({preg, setI, i, points, setPoints}) {
    const {shuffle} = require("../utils.js")
    var [arr, setArr] = useState([])
    var [respuesta, setRespuesta] = useState("")
    
    useEffect(() => {
        setArr(shuffle([...preg.incorrect_answers, preg.correct_answer]))
        setRespuesta("") 
    }, [preg])
    
    useEffect(() => {
        if(respuesta === preg.correct_answer) setPoints(points + 10)
    }, [respuesta])
    
    function handleClick(e){
        e.preventDefault()
        if(!respuesta){
            setRespuesta(e.target.value)
        }
     }
     
    return (
        <div className={s.container}>
           <div className={s.category}>
            {preg.category} 
           </div>
           
           <div className={s.preg}>
                {preg.question.replace(/&#039;/g,"'").replace(/&quot;/g,'"')}
           </div>
           
           <div className={s.resContainer}>
                <div className={s.respuestas}>
                    {arr.map(x=>(
                        <button value={x} onClick={handleClick} className={x===respuesta ?(respuesta === preg.correct_answer ? s.correct : s.incorrect):s.button}>
                            {x.replace(/&#039;/g,"'").replace(/&quot;/g,'"')}
                        </button>
                    ))}
                </div>
                {respuesta && respuesta !== preg.correct_answer && (
                    <span>The correct answer was: {preg.correct_answer.replace(/&#039;/g,"'").replace(/&quot;/g,'"')}</span>
                )}
                
           </div>
           {respuesta && (
               <button onClick={()=>setI(i+1)} className={s.next}>NEXT</button>
           )}
        </div>
    )
}

export default Pregunta
