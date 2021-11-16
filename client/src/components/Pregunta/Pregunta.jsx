import React, {useState, useEffect, useRef} from 'react';
import s from "./Pregunta.module.css"
import Countdown from "react-countdown"

function Pregunta({preg, setI, i, points, setPoints}) {
    const {shuffle} = require("../utils.js")
    var [arr, setArr] = useState([])
    var [respuesta, setRespuesta] = useState("")
    var [segundos, setSegundos] = useState("")
    const getApi = useRef();
    useEffect(() => {
        setArr(shuffle([...preg.incorrect_answers, preg.correct_answer]))
        setRespuesta("")
        getApi.current.start();
        setSegundos(0)
    }, [preg])
    
    useEffect(() => {
        if(respuesta === preg.correct_answer) setPoints(points + 10 * segundos)
    }, [respuesta])
    
    function handleClick(e){
        e.preventDefault()
        setSegundos(getApi.current.state.timeDelta.seconds)
        if(!respuesta){
            setRespuesta(e.target.value)
        }
        getApi.current.pause();
     }
    
     
     const renderer = ({  seconds, completed }) => {
        
        if (completed) {
          // Render a completed state
          setRespuesta("none")
          return (
            <div>
                0
            </div>)
        } else {
          // Render a countdown
           return (
               <div className={s.contador}>
                   <h4>{seconds}</h4>
               </div>
           )
        }
      };
      
    return (
        <div className={s.container}>
            <Countdown 
            date={Date.now() + 15000} 
            ref={getApi}
            renderer={renderer}
            autoStart={false}
            />
           <div className={s.category}>
            {preg.category} 
           </div>
           
           <div className={s.preg}>
                {preg.question.replace(/&#039;/g,"'").replace(/&quot;/g,'"').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"')}
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
