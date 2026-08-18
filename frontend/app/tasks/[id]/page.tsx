'use client';
import { useEffect, useState } from 'react';
import { api } from '../../../lib/api';
import { useParams, useRouter } from 'next/navigation';
import AppShell from '../../../components/AppShell';
import { ArrowLeft, Calendar, CheckCircle2, Circle, MessageCircle, Trash2 } from 'lucide-react';

export default function Detail() {
  const p = useParams();
  const r = useRouter();
  const [t, setT] = useState<any>();
  const [c, setC] = useState<any[]>([]);
  const [text, setText] = useState('');

  const load = async () => {
    const [a, b] = await Promise.all([api(`/tasks/${p.id}`), api(`/comments/${p.id}`)]);
    setT(a);
    setC(b);
  };

  useEffect(() => {
    load().catch(() => r.push('/tasks'));
  }, [p.id]);

  if (!t) return <AppShell title="Task">Loading...</AppShell>;

  const update = async (d: any) => {
    await api(`/tasks/${p.id}`, { method: 'PATCH', body: JSON.stringify(d) });
    load();
  };

  const comment = async () => {
    if (!text.trim()) return;
    await api(`/comments/${p.id}`, { method: 'POST', body: JSON.stringify({ text }) });
    setText('');
    load();
  };

  const del = async () => {
    if (confirm('Delete this task?')) {
      await api(`/tasks/${p.id}`, { method: 'DELETE' });
      r.push('/tasks');
    }
  };

  return (
    <AppShell title="Task details">
      <div className="max-w-5xl space-y-5">
        <button className="btn" onClick={() => r.push('/tasks')}>
          <ArrowLeft size={16} />Back
        </button>
        <div className="grid lg:grid-cols-[1fr_330px] gap-5">
          <div className="panel p-6">
            <div className="flex gap-3">
              <button onClick={() => update({ status: t.status === 'done' ? 'todo' : 'done' })}>
                {t.status === 'done' ? <CheckCircle2 size={23} style={{ color: 'var(--accent)' }} /> : <Circle size={23} className="muted" />}
              </button>
              <div className="flex-1">
                <h2 className="text-2xl font-bold">{t.title}</h2>
                <p className="muted mt-3 whitespace-pre-wrap">{t.description || 'No description.'}</p>
              </div>
            </div>
            <div className="mt-8 pt-5 border-t" style={{ borderColor: 'var(--border)' }}>
              <h3 className="font-bold flex items-center gap-2"><MessageCircle size={18} />Comments</h3>
              <div className="space-y-4 my-5">
                {c.map(x => <div key={x._id}><div className="font-semibold text-sm">{x.authorName || 'User'}</div><div className="muted text-sm mt-1">{x.text}</div></div>)}
                {!c.length && <div className="muted text-sm">No comments yet.</div>}
              </div>
              <div className="flex gap-2">
                <input className="input" placeholder="Write a comment..." value={text} onChange={e => setText(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') comment(); }} />
                <button className="btn btn-primary" onClick={comment}>Post</button>
              </div>
            </div>
          </div>
          <aside className="panel p-5 space-y-5">
            <div><div className="text-xs muted">Status</div><select className="input mt-2" value={t.status} onChange={e => update({ status: e.target.value })}><option value="todo">To do</option><option value="in-progress">In progress</option><option value="done">Done</option></select></div>
            <div><div className="text-xs muted">Priority</div><select className="input mt-2" value={t.priority} onChange={e => update({ priority: e.target.value })}><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option></select></div>
            <div><div className="text-xs muted flex items-center gap-1"><Calendar size={13} />Due date</div><input className="input mt-2" type="date" value={t.dueDate ? t.dueDate.slice(0, 10) : ''} onChange={e => update({ dueDate: e.target.value || undefined })} /></div>
            <div><div className="text-xs muted">Tags</div><div className="flex flex-wrap gap-2 mt-2">{t.tags?.map((x: string) => <span key={x} className="text-xs border rounded-full px-2 py-1" style={{ borderColor: 'var(--border)' }}>#{x}</span>)}</div></div>
            <button className="btn w-full" onClick={del}><Trash2 size={16} />Delete task</button>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
