import React from 'react'
import s from "./Home.module.css"

function Home({isLog}) {
    
    return (
        <div className={s.container}>
           {isLog && isLog.username  && (
               <div className={s.saludo}>
                    <h4>Hi, {isLog.username.charAt(0).toUpperCase()+isLog.username.slice(1).toLowerCase()}</h4>
                </div>
           )}
           
        </div>
    )
}

export default Home
