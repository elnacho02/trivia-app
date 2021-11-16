import React from 'react'
import s from "./Home.module.css"

function Home({isLog}) {
    
    return (
        <div className={s.container}>
           {isLog && isLog.username  && (
               <div className={s.saludo}>
                    <h4>Hi, </h4>
                    <h4 className={s.resaltar}>{isLog.username.charAt(0).toUpperCase()+isLog.username.slice(1).toLowerCase()}!</h4>
                    <h4> Play to beat your highscore: </h4>
                    <h4 className={s.resaltar}>{isLog.highScore} points</h4>
                </div>
           )}
           {(!isLog || !isLog.username)  && (
               <div className={s.saludo}>
                    <h4>Hi, stranger! Dont forget to login to compete in the ranking</h4>
                </div>
           )}
           <div className={s.about}>
               <h4>About this project</h4>
               <p>🔴Technologies used:<br/>
                    🔹Front-end: React - CSS Modules<br/>
                    🔹Back-end: Node.js – Express.js - Mongoose - JWT<br/>
                    🔹Database: MongoDB<br/>
                    <br/>
                    🔴 Functionalities:<br/>
                    🔸 Login and Register<br/>
                    🔸 Play with score functionality<br/>
                    🔸 Be ranked by your highscore</p><br/>
                All the questions are brought from Open Trivia Database <br/>
                <a href="https://opentdb.com/">https://opentdb.com/</a>
           </div>
           <div className={s.link}>
               <a href="https://www.linkedin.com/in/ignacio-aranda-977632225/"><i class="fab fa-linkedin"></i></a>
               <a href="https://github.com/elnacho02"><i class="fab fa-github"></i></a>
           </div>
           
        </div>
    )
}

export default Home
