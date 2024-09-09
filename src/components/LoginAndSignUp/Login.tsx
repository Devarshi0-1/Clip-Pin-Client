import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useLogin from '@/hooks/User/useLogin'
import type { FC, FormEvent } from 'react'
import { useState } from 'react'

const Login: FC = () => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const { loading, login } = useLogin()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await login(username, password)
    }

    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <CardHeader className='space-y-1'>
                    <CardTitle className='text-3xl'>Login</CardTitle>
                    <CardDescription>Enter your information below to Login</CardDescription>
                </CardHeader>
                <CardContent className='grid gap-4'>
                    <div className='grid gap-2'>
                        <Label htmlFor='username'>Username</Label>
                        <Input
                            id='username'
                            type='text'
                            placeholder='johndoe'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className='grid gap-2'>
                        <Label htmlFor='password'>Password</Label>
                        <Input
                            id='password'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        type='button'
                        loading={loading}
                        variant='secondary'
                        onClick={async () => {
                            await login('demousername', 'demopassword')
                        }}>
                        Demo Login
                    </Button>
                    <Button className='ml-auto' loading={loading}>
                        Login
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}

export default Login
