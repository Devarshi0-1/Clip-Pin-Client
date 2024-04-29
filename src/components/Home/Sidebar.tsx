import { Archive, Home, NotebookPen, Tags } from 'lucide-react'

import useStore from '@/zustand/store'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '../ui/button'

export function Sidebar() {
    const { sidebarOpen, setTagOpen } = useStore()
    const sidebarTextStyle = `group-hover:block w-60 text-left ${sidebarOpen ? '' : 'hidden'}`
    const location = useLocation()

    return (
        <div className={`${sidebarOpen ? 'border-r' : ''} group fixed left-0 mt-5 bg-slate-950`}>
            <div className='hidden h-screen w-fit md:block'>
                <div className='flex flex-col gap-2'>
                    <div className='flex-1'>
                        <nav className='grid items-start gap-4 overflow-hidden px-2 text-lg font-medium lg:px-4'>
                            <Button
                                className='flex items-center gap-6 rounded-lg px-3 py-2 transition-all'
                                onClick={() => setTagOpen(true)}>
                                <Tags className='h-6 w-6' />
                                <p className={sidebarTextStyle}>Tags</p>
                            </Button>
                            <div className='my-3 h-[1px] bg-muted' />
                            <Link
                                className={`${location.pathname === '/home' ? 'bg-muted text-primary' : ''} flex items-center gap-6 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted/50 hover:text-primary`}
                                to='/home'>
                                <Home className='h-6 w-6' />
                                <p className={sidebarTextStyle}>Home</p>
                            </Link>
                            <Link
                                className={`${location.pathname === '/archived' ? 'bg-muted text-primary' : ''} flex items-center gap-6 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted/50 hover:text-primary`}
                                to='/archived'>
                                <Archive className='h-6 w-6' />
                                <p className={sidebarTextStyle}>Archive</p>
                            </Link>
                            <Link
                                className={`${location.pathname === '/superNote' ? 'bg-muted text-primary' : ''} flex items-center gap-6 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted/50 hover:text-primary`}
                                to='/superNote'>
                                <NotebookPen className='h-6 w-6' />
                                <p className={sidebarTextStyle}>Super Note</p>
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    )
}
