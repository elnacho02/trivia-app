import React from 'react'
import {useHistory} from "react-router-dom"
import s from "./GameOver.module.css"

function GameOver({points, getPreg}) {
    
   let history = useHistory()
    function goRank(e){
        e.preventDefault()
        history.push("/rank")
    } 
    
    return (
        <div className={s.mainContainer}>
           <div className={s.container}>
                <h4>
                    Game Over! <br/>
                    Your score: {points}
                </h4>
                <div className={s.botones}>
                    <button onClick={getPreg}>TRY AGAIN</button>
                    <button onClick={goRank}>RANKING</button>
                </div>
           </div>
        </div>
    )
}

export default GameOver
