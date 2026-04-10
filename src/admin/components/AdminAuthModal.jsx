import { useState } from 'react';

export default function AdminAuthModal({ onSubmit, isLoading, errorMessage }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSubmit({ username, password });
  };

  return (
    <div className='fixed inset-0 z-[100] flex items-center justify-center bg-white'>
      <div className='w-full max-w-md rounded-2xl bg-white p-8 shadow-xl'>
        <h2 className='text-2xl font-bold text-secondary'>Admin Authentication</h2>
        <p className='mt-2 text-sm text-slate-600'>Sign in to access the Goldchild admin panel.</p>

        <form className='mt-6 space-y-4' onSubmit={handleSubmit}>
          <div>
            <label className='mb-1 block text-sm font-medium text-secondary'>Username</label>
            <input
              type='text'
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className='w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-primary'
              required
            />
          </div>

          <div>
            <label className='mb-1 block text-sm font-medium text-secondary'>Password</label>
            <input
              type='password'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className='w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-primary'
              required
            />
          </div>

          {errorMessage ? <p className='text-sm text-red-600'>{errorMessage}</p> : null}

          <button
            type='submit'
            disabled={isLoading}
            className='w-full rounded-lg bg-primary px-4 py-2 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer'
          >
            {isLoading ? 'Authenticating...' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  );
}
