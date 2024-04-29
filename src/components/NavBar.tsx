import useStore from '@/zustand/store'
import { Menu } from 'lucide-react'
import Sort from './Home/Sort'
import SearchBar from './SearchBar'
import { ModeToggle } from './mode-toggle'
import { Button } from './ui/button'
import MyLogo from '/my_Logo.svg'

export default function NavBar() {
    const { sidebarOpen, setSidebarOpen } = useStore()

    return (
        <div className='sticky top-0 z-10 flex w-full items-center justify-between p-5 backdrop-blur-xl'>
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
                <SearchBar />
                <Sort />
                <ModeToggle />
            </div>
        </div>
    )
}
