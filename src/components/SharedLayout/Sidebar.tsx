import useStore from '@/zustand/store'
import { Archive, Home, Menu, PlusCircle } from 'lucide-react'
import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '../ui/button'
import MyLogo from '/my_Logo.svg'

export function Sidebar() {
    const { sidebarOpen, setSidebarOpen, setSelectedNote } = useStore()
    const { pathname } = useLocation()

    useEffect(() => {
        setSelectedNote(null)
    }, [pathname])

    return (
        <div
            className={`${sidebarOpen ? 'translate-x-0 shadow-sm' : '-translate-x-full'} sidebar fixed left-0 top-0 z-50 flex h-full w-[350px] origin-left flex-col overflow-auto border-r bg-background py-2 shadow-zinc-600 transition-transform ease-out`}>
            <div className='flex items-center gap-6 py-3 pl-5'>
                <Button variant='outline' size='icon' onClick={() => setSidebarOpen(!sidebarOpen)}>
                    <Menu className='h-5 w-5' />
                    <span className='sr-only'>Toggle navigation menu</span>
                </Button>
                <div className='flex items-center gap-3'>
                    <img src={MyLogo} alt='My Logo' className='h-10' />
                    <p className='text-3xl font-semibold'>Clip & Pin</p>
                </div>
            </div>
            <div className='flex min-h-fit flex-col items-center justify-center gap-5 px-3 text-center'>
                <div className='flex w-full flex-wrap gap-3'>
                    <Button
                        className='flex w-full flex-1 items-center gap-6 rounded-lg px-3 py-2'
                        onClick={() => {
                            setSelectedNote(null)
                            setSidebarOpen(false)
                        }}
                        variant='default'>
                        <PlusCircle className='h-6 w-6' />
                        <p>Add Note</p>
                    </Button>
                </div>
                <nav className='w-full justify-around gap-5 text-3xl'>
                    <Link
                        className={`${location.pathname === '/home' ? 'bg-secondary' : ''} grid grid-cols-2 px-10 items-center rounded-md p-2`}
                        to='/home'>
                        <Home className='h-6 w-6' />
                        <p>Home</p>
                    </Link>
                    <Link
                        className={`${location.pathname === '/archived' ? 'bg-secondary' : ''} grid grid-cols-2 px-10 items-center rounded-md p-2`}
                        to='/archived'>
                        <Archive className='h-6 w-6' />
                        <p>Archive</p>
                    </Link>
                </nav>
            </div>
        </div>
    )
}
