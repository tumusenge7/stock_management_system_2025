import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../pages/Api'
function Login() {
    const [input, setInput] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        api.post('/login', input)
            .then((res) => {
                console.log(res)
                navigate('/dashboard')
            })
            .catch(err => console.log(err))
    }
    return (
        <div>
            <h2>login page</h2>
            <div>
                <form onSubmit={handleSubmit} >
                    email: <input type="email" name="email" onChange={(e) => setInput({ ...input, email: e.target.value })} /><br />
                    password: <input type="password" name="password" onChange={(e) => setInput({ ...input, password: e.target.value })} /><br />

                    <button>login</button>
                </form>
            </div>
        </div>
    )
}
export default Login