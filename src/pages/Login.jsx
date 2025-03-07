import React, { useState } from 'react';

function Login() {
  const [currentState, setCurrentState] = useState('Sign Up');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');

    const url = currentState === 'Sign Up' 
        ? 'http://127.0.0.1:8000/api/register/' 
        : 'http://127.0.0.1:8000/api/login/';

    const payload = currentState === 'Sign Up' 
        ? { first_name: formData.name, email: formData.email, password: formData.password } 
        : { email: formData.email, password: formData.password };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (data.status_code === 6000) {
            setMessage(currentState === 'Sign Up' ? 'Registration Successful!' : 'Login Successful!');
            localStorage.setItem('access_token', data.data.access);
            localStorage.setItem('refresh_token', data.data.refresh);
        } else {
            setError(data.message);
        }
    } catch (error) {
        setError('Failed to connect to the server. Check your backend.');
    }
};


  return (
    <div>
      <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
        <div className="inline-flex items-center gap-2 mb-2 mt-10">
          <p className="text-3xl prata-regular">{currentState}</p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>

        {currentState === 'Login' ? '' : (
          <input 
            type="text" 
            name="name" 
            className="w-full px-3 py-2 border border-gray-800" 
            placeholder="Name" 
            required 
            onChange={handleChange} 
          />
        )}
        
        <input 
          type="email" 
          name="email" 
          className="w-full px-3 py-2 border border-gray-800" 
          placeholder="Email" 
          required 
          onChange={handleChange} 
        />
        
        <input 
          type="password" 
          name="password" 
          className="w-full px-3 py-2 border border-gray-800" 
          placeholder="Password" 
          required 
          onChange={handleChange} 
        />
        
        <div className="flex justify-between w-full text-sm mt-[-8px]">
          <p className="cursor-pointer">Forgot your password?</p>
          {currentState === 'Login' ? (
            <p onClick={() => setCurrentState('Sign Up')} className="cursor-pointer">Create account</p>
          ) : (
            <p onClick={() => setCurrentState('Login')} className="cursor-pointer">Login Here</p>
          )}
        </div>
        
        {error && <p className="text-red-500">{error}</p>}
        {message && <p className="text-green-500">{message}</p>}
        
        <button className="bg-black text-white font-light px-8 py-2 mt-4 rounded-md">
          {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}

export default Login;
