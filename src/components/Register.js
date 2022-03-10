import React, { useState } from 'react'
import axios from 'axios'
import {setUserSession, getUser, getToken } from '../Utils/Common'


const Dashboard = (props) => {
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
        axios.post("https://api-sandbox.pismolabs.io/acquisitions/v2/s2s/applications", {
            "application": {
              "program_id": 8544,
              "due_date": "14550",
              "submit": true,
              "engine": "BYPASS",
              "applicant": {
                "document_number": "790-77-7695",
                "birth_date": "01/01/1985",
                "personal": {
                  "name": "Srinivasa Ramanujan",
                  "email": "Christiana_Kreiger6@yahoo.com"
                },
                "addresses": [
                  {
                    "address": "Sarangapani Main Street",
                    "number": "9",
                    "country": "India",
                    "complementary_address": "Suite L",
                    "neighborhood": "Kumbakonam",
                    "city": "Kumbakonam",
                    "state": "TN",
                    "zip_code": "612001",
                    "date": "31/01/1990",
                    "mailing_address": true,
                    "address_type": "RESIDENTIAL",
                    "phones": [
                      {
                        "phone": "745551234",
                        "phone_type": "MOBILE",
                        "country_code": "91",
                        "area_code": "44"
                      }
                    ]
                  }
                ],
                "account": {
                  "external_id": "704043f5-82dd-4122-9f9c-b080d5b4a43d",
                  "granted_limit": 1000,
                  "limit": 1000
                }
              }
            }
          }, {
              headers : { 
                'Content-Type': 'application/json', 
                'Authorization': token
                }
            }).then(response => {
            setLoading(false);
            setUserSession(response.data.token, response.data);
            props.history.push('/login')

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
            <h1>Register {user.name}</h1>
            {/* <input 
                type="button" 
                value="logout"
                onClick={handleLogout}
            /> */}
            <br/><br/>
            <button onClick={registerUser}>{ loading ? "Registering..." : "Register User" }</button>
            {error && <p className='error'> {error} </p>}
        </div>
    )
}

export default Dashboard