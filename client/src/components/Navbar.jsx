import React, {useEffect, useState} from 'react'
import {NavLink, useLocation} from "react-router-dom"
import s from "./Navbar.module.css"
import axios from "axios"

function Navbar({isLog, logVerif, setIsLog}) {
    let location = useLocation()
    /* var [isLog, setIsLog] = useState([])*/
    useEffect(() => {
        /* axios("http://localhost:3001/isLog",{withCredentials: "include"}).then(data => setIsLog(data.data)) */
        logVerif()
    }, [location]) 
    
    function logOut(){
        axios("http://localhost:3001/logout", {withCredentials: "include"}).then(setIsLog(false))
    }

    return (
        <div className={s.container}>
            <div className={s.navigation}>
                <NavLink to="/home" className={s.home}>
                    <img src='https://www.nicepng.com/png/full/232-2328543_trivia-icon.png' width="40px"/>
                    <h1>TriviApp</h1>
                </NavLink>
                <div className={s.links}>
                    <NavLink to="/play" className={s.play}>
                        {/* <img src="https://www.pngall.com/wp-content/uploads/5/Video-Game-Controller-PNG-Picture.png" alt="" width="25px"/> */}
                        <i class="fas fa-gamepad"></i>
                        <h3>PLAY</h3>
                    </NavLink>
                    <NavLink to="/rank" className={s.rank}>
                        {/* <img src="https://i.pinimg.com/originals/83/b1/f3/83b1f39083f8dc4a4e31c1b4b8e8706e.png" alt="" width="25px"/> */}
                        <i class="fas fa-crown"></i>
                        <h3>RANK</h3>
                    </NavLink>
                </div>
            </div>
            <div className={s.user}>
                {isLog === false && (
                    <NavLink to="/login" className={s.login}>LOG IN</NavLink>   
                )}
                {isLog && (
                    <div onClick={logOut} className={s.logout}>
                        LOG OUT
                    </div>
                )}
                
            </div>
        </div> 
    )
}

export default Navbar
