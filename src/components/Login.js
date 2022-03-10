import React, { useState } from 'react'
import axios from 'axios'
import {setUserSession, getUser, getToken } from '../Utils/Common'


const Login = (props) => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const user = getUser()

    // const handleLogout = () => {
    //     props.history.push('/login')
    // }

    const registerUser = () => {
        alert('hello');
        setError(null);
        setLoading(true);
        const token = getToken();
        console.log('token =>', token);
        axios.post("https://api-sandbox.pismolabs.io/passport/v2/s2s/access-token", {
                "server_key": "01939ea4ff57c7d10c8a0cef09023350a785430f",
                "server_secret": ".9Y2o)H;p-szmcy(a4wpLd$&.>sJ:y98_G[F4qbYn?d?sf)x",
                "account_id": 102681871
          }, {
              headers : { 
                'Content-Type': 'application/json', 
                'Authorization': token
                }
            }).then(response => {
            setLoading(false);
            setUserSession(response.data.token, response.data);
            props.history.push('/plasticcards')

            console.log('register user response =>', response);
        }).catch(error => {
            console.log(error);
            setLoading(false)
            if(error.response.status === 401 || error.response.status === 400) {
                setError(error.response.data.message);
            } else {
                setError("Something went wrong")
            }
        })

    }

    return (
        <div>
            <h1>Login {user.name}</h1>
            {/* <input 
                type="button" 
                value="logout"
                onClick={handleLogout}
            /> */}
            <br/><br/>
            <button onClick={registerUser}>{ loading ? "Loading..." : "Login" }</button>
            {error && <p className='error'> {error} </p>}
        </div>
    )
}

export default Login