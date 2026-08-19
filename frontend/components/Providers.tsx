'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
type Ctx = { user: any; setUser: (u: any) => void; theme: string; toggleTheme: () => void };
const C = createContext<Ctx>({
  user: null,
  setUser: () => {},
  theme: 'light',
  toggleTheme: () => {},
});
export default function Providers({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    const u = localStorage.getItem('user');
    if (u) setUser(JSON.parse(u));
    const t = localStorage.getItem('theme') || 'light';
    setTheme(t);
    document.documentElement.className = t;
  }, []);
  const update = (u: any) => {
    setUser(u);
    if (u) localStorage.setItem('user', JSON.stringify(u));
    else localStorage.removeItem('user');
  };
  const toggleTheme = () => {
    const n = theme === 'light' ? 'dark' : 'light';
    setTheme(n);
    localStorage.setItem('theme', n);
    document.documentElement.className = n;
  };
  return <C.Provider value={{ user, setUser: update, theme, toggleTheme }}>{children}</C.Provider>;
}
export const useApp = () => useContext(C);
