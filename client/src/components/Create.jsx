import React, {useState} from 'react'
import {useHistory} from "react-router-dom"
import s from "./Create.module.css"
import axios from "axios"
function Create() {
    let history = useHistory()
    var [datos, setDatos] = useState({
        username: "",
        password: ""
    })
    function handleChange(e){
        const value = e.target.value;
        setDatos({
          ...datos,
          [e.target.name]: value
        });
       }
       function handleSubmit(e){
        e.preventDefault()
        axios("https://trivia-app01.herokuapp.com/user/create",{
            method: "post",    
            data:datos
        }).then(history.push("/login"))
        
      }
    return (
        <div className={s.container}>
            <div className={s.formContainer}>
                <form onSubmit={handleSubmit} className={s.form}>
                    <h2>Register</h2>
                    <hr/>
                    <h5>Username</h5>
                    <input type="text" value={datos.username} name='username' onChange={(e)=>handleChange(e)} required autoComplete='off'/>
                    <h5>Password</h5>
                    <input type="text" value={datos.password} name='password' onChange={(e)=>handleChange(e)} required autoComplete='off'/>
                    <button type='submit'>Create</button>
                </form>
            </div>
            {/* <div className={s.side}>
                
            </div> */}
        </div>
    )
}

export default Create
