'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from './Sidebar';
import { useApp } from './Providers';
import Link from 'next/link';
import { Menu, Plus } from 'lucide-react';
export default function AppShell({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  const { user } = useApp();
  const r = useRouter();
  useEffect(() => {
    if (!user) r.push('/login');
  }, [user, r]);
  if (!user) return null;
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 min-w-0">
        <header
          className="h-16 border-b flex items-center justify-between px-4 md:px-8"
          style={{ borderColor: 'var(--border)', background: 'var(--panel)' }}
        >
          <div className="flex items-center gap-3">
            <Menu className="md:hidden" size={20} />
            <h1 className="font-bold text-lg">{title || 'Workspace'}</h1>
          </div>
          <Link className="btn btn-primary" href="/tasks/new">
            <Plus size={17} />
            New task
          </Link>
        </header>
        <div className="p-4 md:p-8 max-w-[1500px] mx-auto">{children}</div>
      </main>
    </div>
  );
}
