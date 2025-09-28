import React, { useState } from 'react'

const Login = ({ onLogin }:{ onLogin: () => Promise<void> }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

  return (
    <div className='flex flex-col justify-center items-center w-full h-full gap-2'>
        <p>Login</p>
        <input value={username} type='text' placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
        <input value={password} type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
        <button onClick={onLogin}>login</button>
    </div>
  )
}

export default Login