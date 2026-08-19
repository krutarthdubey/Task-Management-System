'use client';
import { Calendar, CheckCircle2, Circle, MoreHorizontal, Trash2 } from 'lucide-react';
import { api } from '../lib/api';
import { useRouter } from 'next/navigation';
const statusLabel: any = { todo: 'To do', 'in-progress': 'In progress', done: 'Done' };
export default function TaskCard({ task, onChange }: { task: any; onChange: () => void }) {
  const r = useRouter();
  const toggle = async () => {
    await api(`/tasks/${task._id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status: task.status === 'done' ? 'todo' : 'done' }),
    });
    onChange();
  };
  const del = async () => {
    if (confirm('Delete this task?')) {
      await api(`/tasks/${task._id}`, { method: 'DELETE' });
      onChange();
    }
  };
  return (
    <div className="panel p-4 hover:shadow-sm transition">
      <div className="flex items-start gap-3">
        <button onClick={toggle} className="mt-0.5">
          {task.status === 'done' ? (
            <CheckCircle2 size={20} style={{ color: 'var(--accent)' }} />
          ) : (
            <Circle size={20} className="muted" />
          )}
        </button>
        <div className="flex-1 min-w-0 cursor-pointer" onClick={() => r.push(`/tasks/${task._id}`)}>
          <div
            className={`font-semibold ${task.status === 'done' ? 'line-through opacity-60' : ''}`}
          >
            {task.title}
          </div>
          <div className="text-sm muted mt-1 line-clamp-2">
            {task.description || 'No description'}
          </div>
        </div>
        <button className="muted" onClick={del}>
          <Trash2 size={17} />
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mt-4 items-center">
        <span
          className="text-xs px-2 py-1 rounded-full"
          style={{
            background: 'color-mix(in srgb,var(--accent) 10%,transparent)',
            color: 'var(--accent)',
          }}
        >
          {statusLabel[task.status]}
        </span>
        <span
          className="text-xs px-2 py-1 rounded-full border"
          style={{ borderColor: 'var(--border)' }}
        >
          {task.priority}
        </span>
        {task.dueDate && (
          <span className="text-xs muted flex items-center gap-1">
            <Calendar size={13} />
            {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
        {task.tags?.map((t: string) => (
          <span key={t} className="text-xs muted">
            #{t}
          </span>
        ))}
      </div>
    </div>
  );
}
