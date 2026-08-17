import './globals.css'; import type {Metadata} from 'next'; import Providers from '../components/Providers';
export const metadata:Metadata={title:'AbleSpace Task Manager',description:'A focused workspace for tasks, projects and collaboration'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><Providers>{children}</Providers></body></html>}
