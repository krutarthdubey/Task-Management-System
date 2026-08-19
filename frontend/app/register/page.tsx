'use client';
import { FormEvent, useState } from 'react';
import { auth } from '../../lib/api';
import { useApp } from '../../components/Providers';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
export default function Register() {
  const [n, setN] = useState('');
  const [e, setE] = useState('');
  const [p, setP] = useState('');
  const [err, setErr] = useState('');
  const { setUser } = useApp();
  const r = useRouter();
  const submit = async (x: FormEvent) => {
    x.preventDefault();
    try {
      const d = await auth.register({ name: n, email: e, password: p });
      localStorage.setItem('token', d.token);
      setUser(d.user);
      r.push('/');
    } catch (ex: any) {
      setErr(ex.message);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={submit} className="w-full max-w-md space-y-4">
        <div className="text-3xl font-bold">Create your workspace</div>
        <p className="muted">Start organizing your work in one place.</p>
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
          placeholder="Full name"
          value={n}
          onChange={(x) => setN(x.target.value)}
          required
        />
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
          placeholder="Password (6+ characters)"
          type="password"
          value={p}
          onChange={(x) => setP(x.target.value)}
          minLength={6}
          required
        />
        <button className="btn btn-primary w-full">Create account</button>
        <div className="text-center text-sm muted">
          Already have an account?{' '}
          <Link href="/login" style={{ color: 'var(--accent)' }}>
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
}
