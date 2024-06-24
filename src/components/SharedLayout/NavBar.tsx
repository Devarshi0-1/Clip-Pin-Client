import useStore from '@/zustand/store'
import { Menu } from 'lucide-react'
import { Button } from '../ui/button'
import Settings from './Settings'
import Sort from './Sort'
import MyLogo from '/my_Logo.svg'

export default function NavBar() {
    const { sidebarOpen, setSidebarOpen } = useStore()

    return (
        <div className='relative mb-6 flex w-full items-center justify-between bg-background p-5'>
            <div className='flex items-center justify-center gap-6'>
                <Button variant='outline' size='icon' onClick={() => setSidebarOpen(!sidebarOpen)}>
                    <Menu className='h-5 w-5' />
                    <span className='sr-only'>Toggle navigation menu</span>
                </Button>
                <div className='flex items-center gap-3'>
                    <img src={MyLogo} alt='My Logo' className='h-10' />
                    <p className='text-3xl font-semibold'>Clip & Pin</p>
                </div>
            </div>
            <div className='flex items-center gap-5'>
                <Sort />
                <Settings />
            </div>
        </div>
    )
}
