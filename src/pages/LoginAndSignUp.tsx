import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { type FC } from 'react'
import Login from '../components/LoginAndSignUp/Login'
import SignUp from '../components/LoginAndSignUp/SignUp'

const LoginAndSignUp: FC = () => {
    return (
        <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
            <Tabs defaultValue='login' className='w-[450px]'>
                <TabsList className='grid w-full grid-cols-2'>
                    <TabsTrigger value='login'>Login</TabsTrigger>
                    <TabsTrigger value='signup'>SignUp</TabsTrigger>
                </TabsList>
                <TabsContent value='login'>
                    <Login />
                </TabsContent>
                <TabsContent value='signup'>
                    <SignUp />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default LoginAndSignUp
