import React, {useEffect, useState} from 'react'
import { useHistory} from "react-router-dom"
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
        .then(data => history.push(data.redirect))
      }
    useEffect(() => {
        fetch(api_base+"/isLog",{credentials:"include"})
        .then(x=>x.json()).then(e => e.isLog &&  history.push("/"))
    }, [])

    return (
        <form action="">
            <input type="text" name="username" placeholder='Username' onChange={(e)=>handleChange(e)}/>
            <input type="text" name='password' placeholder='Password' onChange={(e)=>handleChange(e)}/>
            <button onClick={handleSubmit}>Log In</button>
        </form>
    )
}

export default Login
