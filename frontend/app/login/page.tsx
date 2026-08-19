'use client';
import { FormEvent, useState } from 'react';
import { auth } from '../../lib/api';
import { useApp } from '../../components/Providers';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
export default function Login() {
  const [e, setE] = useState('');
  const [p, setP] = useState('');
  const [err, setErr] = useState('');
  const { setUser } = useApp();
  const r = useRouter();
  const submit = async (x: FormEvent) => {
    x.preventDefault();
    setErr('');
    try {
      const d = await auth.login({ email: e, password: p });
      localStorage.setItem('token', d.token);
      setUser(d.user);
      r.push('/');
    } catch (ex: any) {
      setErr(ex.message);
    }
  };
  const guest = async () => {
    const d = await auth.guest();
    localStorage.setItem('token', d.token);
    setUser(d.user);
    r.push('/');
  };
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div
        className="hidden lg:flex items-center justify-center p-16"
        style={{ background: 'var(--accent)', color: 'white' }}
      >
        <div className="max-w-md">
          <div className="text-4xl font-black">AbleSpace</div>
          <p className="mt-4 text-lg opacity-90">
            Turn scattered work into a calm, focused workspace.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center p-6">
        <form onSubmit={submit} className="w-full max-w-md space-y-5">
          <div>
            <div className="text-3xl font-bold">Welcome back</div>
            <div className="muted mt-1">Sign in to your workspace.</div>
          </div>
          {err && (
            <div
              className="p-3 rounded-lg text-sm"
              style={{ background: '#fee2e2', color: '#991b1b' }}
            >
              {err}
            </div>
          )}
          <input
            className="input"
            placeholder="Email"
            type="email"
            value={e}
            onChange={(x) => setE(x.target.value)}
            required
          />
          <input
            className="input"
            placeholder="Password"
            type="password"
            value={p}
            onChange={(x) => setP(x.target.value)}
            required
          />
          <button className="btn btn-primary w-full">Sign in</button>
          <button type="button" className="btn w-full" onClick={guest}>
            Continue as guest
          </button>
          <div className="text-center text-sm muted">
            No account?{' '}
            <Link href="/register" style={{ color: 'var(--accent)' }}>
              Create one
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
