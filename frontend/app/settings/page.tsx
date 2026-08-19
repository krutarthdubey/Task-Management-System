'use client';
import { useEffect, useState } from 'react';
import AppShell from '../../components/AppShell';
import { api } from '../../lib/api';
import { useApp } from '../../components/Providers';
export default function Settings() {
  const { user, setUser } = useApp();
  const [n, setN] = useState('');
  const [b, setB] = useState('');
  const [msg, setMsg] = useState('');
  useEffect(() => {
    if (user) {
      setN(user.name || '');
      setB(user.bio || '');
    }
  }, [user]);
  const save = async () => {
    const u = await api('/users/me', {
      method: 'PATCH',
      body: JSON.stringify({ name: n, bio: b }),
    });
    setUser(u);
    localStorage.setItem('user', JSON.stringify(u));
    setMsg('Saved');
    setTimeout(() => setMsg(''), 1500);
  };
  return (
    <AppShell title="Settings">
      <div className="max-w-2xl space-y-5">
        <div className="panel p-6 space-y-5">
          <div>
            <h2 className="text-lg font-bold">Profile</h2>
            <p className="muted text-sm">Update how you appear in the workspace.</p>
          </div>
          <div>
            <label className="text-sm font-semibold">Name</label>
            <input className="input mt-2" value={n} onChange={(e) => setN(e.target.value)} />
          </div>
          <div>
            <label className="text-sm font-semibold">Email</label>
            <input className="input mt-2 opacity-60" value={user?.email || ''} disabled />
          </div>
          <div>
            <label className="text-sm font-semibold">Bio</label>
            <textarea
              className="input mt-2 min-h-28"
              value={b}
              onChange={(e) => setB(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="btn btn-primary" onClick={save}>
              Save changes
            </button>
            {msg && <span className="text-sm muted">{msg}</span>}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
