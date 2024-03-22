import { ModeToggle } from './mode-toggle'
import MyLogo from '/my_Logo.svg'

export default function NavBar() {
    return (
        <div className='flex w-full items-center justify-between p-4'>
            <div className='flex items-center gap-3'>
                <img src={MyLogo} alt='My Logo' className='h-14' />
                <p className='text-3xl font-semibold'>Clip & Pin</p>
            </div>
            <div className='flex items-center gap-5'>
                {/* <Button variant='outline'>Add Friend</Button> */}
                <ModeToggle />
            </div>
        </div>
    )
}
