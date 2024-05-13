import { useState } from 'react';
import { loginAsync } from '../app/store';
import { useAppDispatch } from '../app/hooks';

const LoginForm = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      // Call loginAsync action creator
      await dispatch(loginAsync());
      setIsLoading(false);
      // Clear input fields after successful login
      setUsername('');
      setPassword('');
    } catch (err) {
      setIsLoading(false);
      setError('Invalid username or password'); // or handle other error cases
    }
  };

  return (
    <div className=' flex justify-center items-center w-full min-h-screen'>
      <div className=' flex flex-col items-center justify-center w-2/5 h-full border border-zinc-100 shadow-md rounded-xl'>
        <h2 className=' text-3xl my-6 font-black'>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className=' w-3/4 border border-zinc-500 my-5 py-3 px-4 rounded-xl'
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className=' w-3/4 border border-zinc-500 my-5 py-3 px-4 rounded-xl'
        />
        <button onClick={handleLogin} disabled={isLoading} className=' rounded-xl bg-blue-500 px-6 py-2 text-white my-8 font-bold text-lg'>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default LoginForm;
