import React from 'react'
import s from "./PrePlay.module.css"
function PrePlay({setGo}) {
    return (
        <div className={s.container}>
            <div className={s.mensaje}>
                <h5>You´ll have 15 seconds per question, the faster you answer the more points you will get </h5>
            </div>
            <h5>Are you ready?</h5>
            <button type="" onClick={()=>setGo(2)}>START</button>
        </div>
    )
}

export default PrePlay
