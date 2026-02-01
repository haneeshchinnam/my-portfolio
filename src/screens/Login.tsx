import React, { useEffect, useState } from 'react'

const Login = ({ onLogin, setPasswordInput, setUsernameInput }:{ onLogin: () => Promise<void>; setUsernameInput: React.Dispatch<React.SetStateAction<string>>; setPasswordInput: React.Dispatch<React.SetStateAction<string>> }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        setUsernameInput(username);
    }, [username]);

    useEffect(() => {
        setPasswordInput(password);
    }, [password]);

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