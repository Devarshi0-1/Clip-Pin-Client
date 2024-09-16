import useLogout from '@/hooks/User/useLogout'
import useStore from '@/zustand/store'
import { Archive, Home, Menu, PlusCircle } from 'lucide-react'
import { useEffect } from 'react'
import { BiLogOut } from 'react-icons/bi'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '../ui/button'
import MyLogo from '/my_Logo.svg'

export function Sidebar() {
    const sidebarOpen = useStore((state) => state.sidebarOpen)
    const setSidebarOpen = useStore((state) => state.setSidebarOpen)
    const setSelectedNote = useStore((state) => state.setSelectedNote)

    const { pathname } = useLocation()
    const { loading, logout } = useLogout()

    useEffect(() => {
        setSelectedNote(null)
    }, [pathname])

    return (
        <div
            className={`${sidebarOpen ? 'translate-x-0 shadow-sm' : '-translate-x-full'} sidebar fixed left-0 top-0 z-50 flex h-full w-[350px] origin-left flex-col justify-between overflow-auto border-r bg-background shadow-zinc-600 transition-transform ease-out`}>
            <div>
                <div className='flex items-center gap-6 py-3 pl-5'>
                    <Button
                        variant='outline'
                        size='icon'
                        onClick={() => setSidebarOpen(!sidebarOpen)}>
                        <Menu className='h-5 w-5' />
                        <span className='sr-only'>Toggle navigation menu</span>
                    </Button>
                    <div className='flex items-center gap-3'>
                        <img src={MyLogo} alt='My Logo' className='h-10' />
                        <p className='text-3xl font-semibold'>Clip & Pin</p>
                    </div>
                </div>
                <div className='mt-10 flex flex-col gap-3 px-3'>
                    <Button
                        className='flex w-full items-center gap-6 rounded-lg'
                        onClick={() => {
                            setSelectedNote(null)
                            setSidebarOpen(false)
                        }}
                        variant='default'>
                        <PlusCircle className='h-6 w-6' />
                        <p>Add Note</p>
                    </Button>
                    <nav className='flex w-full justify-between gap-3 text-xl'>
                        <Link
                            className={`${location.pathname === '/home' ? 'bg-secondary' : ''} grid w-1/2 grid-cols-2 items-center rounded-md px-3 py-2`}
                            to='/home'>
                            <Home className='h-6 w-6' />
                            Home
                        </Link>
                        <Link
                            className={`${location.pathname === '/archived' ? 'bg-secondary' : ''} grid w-1/2 grid-cols-2 items-center rounded-md px-3 py-2`}
                            to='/archived'>
                            <Archive className='h-6 w-6' />
                            Archive
                        </Link>
                    </nav>
                </div>
            </div>
            <div className='px-3 py-3'>
                <Button
                    onClick={logout}
                    loading={loading}
                    className='flex w-full items-center gap-6 rounded-lg'>
                    <BiLogOut className='h-6 w-6' />
                    Logout
                </Button>
            </div>
        </div>
    )
}
