import useLogout from '@/hooks/User/useLogout'
import { BiLogOut } from 'react-icons/bi'
import { Button } from '../ui/button'

const LogoutButton = () => {
    const { logout } = useLogout()

    return (
        <Button onClick={logout} size={'icon'} className='fixed bottom-10 right-10 text-xl'>
            <BiLogOut />
        </Button>
    )
}
export default LogoutButton
