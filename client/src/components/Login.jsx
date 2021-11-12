import React, {useEffect, useState} from 'react'
import { useHistory} from "react-router-dom"
import s from "./Login.module.css"
import Navbar from './Navbar';
const api_base = "http://localhost:3001";

function Login() {
    let history = useHistory()
    var [info, setInfo] = useState({
        username:"",
        password:"",
        
       })
    var [isLog, setIsLog] = useState("")
       
       function handleChange(e){
        const value = e.target.value;
        setInfo({
          ...info,
          [e.target.name]: value
        });
       }
      function handleSubmit(e){
        e.preventDefault()
        fetch(api_base+"/login",{
			method: "POST",
            credentials: "include",
			headers: {
				"Content-Type": "application/json" 
			},
			body: JSON.stringify({
				username: info.username,
                password: info.password
			})
		})
        .then(x => x.json())
        .then(data => {
            if(data.redirect !== "/login")return history.push(data.redirect)
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
        fetch(api_base+"/isLog",{credentials:"include"})
        .then(x=>x.json()).then(e => e &&  history.push("/"))
    }, [])

    return (
        <div className={s.container}>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" value={info.username} placeholder='Username' onChange={(e)=>handleChange(e)} required/>
                <input type="password" name='password' value={info.password} placeholder='Password' onChange={(e)=>handleChange(e)} required/>
                <button type='submit'>LOG IN</button>
                <a href="/user/create">create account</a>
            </form>
        </div>
    )
}

export default Login
