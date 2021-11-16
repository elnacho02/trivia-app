import React, {useEffect, useState} from 'react'
import { useHistory} from "react-router-dom"
import s from "./Login.module.css"
import axios from "axios"


function Login() {
    let history = useHistory()
    var [info, setInfo] = useState({
        username:"",
        password:"",
        
       })
       
       function handleChange(e){
        const value = e.target.value;
        setInfo({
          ...info,
          [e.target.name]: value
        });
       }
      function handleSubmit(e){
        e.preventDefault()
        axios("https://trivia-app01.herokuapp.com/login",{
			method: "post",
			data: info
		})
        .then(r => {
            if(r){
                console.log(r, "login tok")
                localStorage.setItem("token", r.data.token);
                return history.push(r.data.redirect)
            }
             else {
                setInfo({
                    username:"",
                    password:""                
                   })
                alert("User or Password incorrect")
            }
        })
      }
    useEffect(() => {
        axios("https://trivia-app01.herokuapp.com/isLog", {
			method: "post",
			data: {
                token: localStorage.getItem("token")
            }
		} )
        .then(e => e.data &&  history.push("/"))
    },[])
    
    return (
        <div className={s.container}>
            <div className={s.side}>
                
            </div>
            <div className={s.formContainer}>
                <form onSubmit={handleSubmit} className={s.form}>
                    <h2>Login</h2>
                    <hr/>
                    <h5>Username</h5>
                    <input type="text" name="username" value={info.username} placeholder='Username' onChange={(e)=>handleChange(e)} required autoComplete='off'/>
                    <h5>Password</h5>
                    <input type="password" name='password' value={info.password} placeholder='Password' onChange={(e)=>handleChange(e)} required autoComplete='off'/>
                    <button type='submit'>Login</button>
                    <a href="/user/create">create account</a>
                </form>
            </div>
            
        </div>
    )
}

export default Login
