import React, {useEffect, useState} from 'react'
import {NavLink, useLocation} from "react-router-dom"
import s from "./Navbar.module.css"
import axios from "axios"

function Navbar({isLog, logVerif, setIsLog}) {
    let location = useLocation()
    /* var [isLog, setIsLog] = useState([])*/
    useEffect(() => {
        logVerif()
    }, [location]) 
    
    function logOut(){
        /* axios("https://trivia-app01.herokuapp.com/logout", {withCredentials: "include"}).then(setIsLog(false)) */
        localStorage.removeItem("token")
        setIsLog(false)
    }
    
    return (
        <div className={s.container}>
            <div className={s.navigation}>
                <NavLink to="/home" className={s.home}>
                    <img src='https://www.nicepng.com/png/full/232-2328543_trivia-icon.png' width="40px" alt="nose"/>
                    <h1>TriviApp</h1>
                </NavLink>
                <div className={s.links}>
                    <NavLink to="/play" className={s.play}>
                        <i class="fas fa-gamepad"></i>
                        <h3>PLAY</h3>
                    </NavLink>
                    <NavLink to="/rank" className={s.rank}>
                        <i class="fas fa-crown"></i>
                        <h3>RANK</h3>
                    </NavLink>
                </div>
            </div>
            <div className={s.user}>
                {(isLog === false || !isLog.username) && (
                    <NavLink to="/login" className={s.login}>
                        <i class="fas fa-sign-in-alt"></i>
                        Sign In
                    </NavLink>   
                )}
                {isLog && isLog.username && (
                    <div className={s.logOutContainer}>
                        <div className={s.avatar}>
                            <img src={isLog.profileImg} alt="" width="35px" style={{"borderRadius":"25px"}}/>
                            {isLog.username.toUpperCase()}
                        </div>
                        <div onClick={logOut} className={s.logout}>
                        <i class="fas fa-sign-out-alt"></i>
                        Log Out
                        </div>
                    </div>
                   
                )}
                
            </div>
        </div> 
    )
}

export default Navbar
