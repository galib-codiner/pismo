import React, { useState } from 'react'
import axios from 'axios'
import { setUserSession } from '../Utils/Common'

const Authenticate = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleLogin = () => {
        // props.history.push('/dashboard')
        setError(null);
        setLoading(true)
        axios.post("https://api-sandbox.pismolabs.io/passport/v2/s2s/access-token", {
            "server_key": "01939ea4ff57c7d10c8a0cef09023350a785430f",
            "server_secret": ".9Y2o)H;p-szmcy(a4wpLd$&.>sJ:y98_G[F4qbYn?d?sf)x"
        }, { 
            'Content-Type': 'application/json'
          }).then(response => {
            setLoading(false);
            setUserSession(response.data.token, response.data);
            props.history.push('/register')

            console.log('response =>', response);
        }).catch(error => {
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
            <h1>Server Authentications</h1>
            <form>
                {/* <div>
                    <label> Server Key </label>
                    <input 
                        type="text" 
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label> Server Secret </label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div> */}
                {error && <p className='error'> {error} </p>}
                <input 
                    type="button" 
                    value={ loading ? "Loading.." : "Authenticate" }
                    onClick={handleLogin}
                />
            </form>
        </div>
    )
}

export default Authenticate