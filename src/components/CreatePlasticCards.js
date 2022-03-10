import React, { useState } from 'react'
import axios from 'axios'
import { getUser, getToken } from '../Utils/Common'


const CreatePlasticCards = (props) => {
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
        axios.post("https://api-sandbox.pismolabs.io/wallet/v2/cards", {
                "type": "PLASTIC",
                "name": "CUB Credit Card - White plastic",
                "metadata": {
                "my-custom": "data"
            }
          }, {
              headers : { 
                'Content-Type': 'application/json',
                'x-customer-id': '102680646', 
                'Authorization': token
                }
            }).then(response => {
            // setLoading(false);
            // setUserSession(response.data.token, response.data);
            // props.history.push('/dashboard')

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
            <h1>Card Creation {user.name}</h1>
            {/* <input 
                type="button" 
                value="logout"
                onClick={handleLogout}
            /> */}
            <br/><br/>
            <button onClick={registerUser}>{ loading ? "Card Creation..." : "Card Creation" }</button>
            {error && <p className='error'> {error} </p>}
        </div>
    )
}

export default CreatePlasticCards