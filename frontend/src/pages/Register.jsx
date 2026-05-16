import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../pages/Api'
function Register() {
    const [input, setInput] = useState({
        name: '',
        email: '',
        password: ''
    })
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        api.post('/register', input)
            .then((res) => {
                console.log(res)
                navigate('/')
            })
    }
    return (
        <div>Register
            <div>
                <form onSubmit={handleSubmit} >
                    name: <input type="text" name='name' onChange={(e) => setInput({ ...input, name: e.target.value })} /><br />
                    email: <input type="email" name="email" onChange={(e) => setInput({ ...input, email: e.target.value })} /><br />
                    password: <input type="password" name="password" onChange={(e) => setInput({ ...input, password: e.target.value })} /><br />

                    <button>register</button>
                </form>
            </div>
        </div>
    )
}

export default Register