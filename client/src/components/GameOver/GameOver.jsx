import React from 'react'
import s from "./GameOver.module.css"
function GameOver({points, getPreg}) {
    return (
        <div>
            Game Over!
            Your score: {points}
            <button onClick={getPreg}>TRY AGAIN</button>
        </div>
    )
}

export default GameOver
