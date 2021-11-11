import React from 'react'
import {Link} from "react-router-dom"
import s from "./Navbar.module.css"
function Navbar() {
    return (
        <div className={s.container}>
            <Link to="/">HOME</Link>
            <Link to="/play">PLAY</Link>
            <Link to="/rank">RANK</Link>
            <Link to="/login">LOG IN</Link>   
        </div> 
    )
}

export default Navbar
