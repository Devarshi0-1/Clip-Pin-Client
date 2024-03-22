import { Toaster } from '@/components/ui/sonner'
import type { FC } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuthContext } from './context/AuthContext'
import Home from './pages/Home'
import LoginAndSignUp from './pages/LoginAndSignUp'

const App: FC = () => {
    const { authUser } = useAuthContext()

    return (
        <div className='min-h-screen min-w-full'>
            <Routes>
                <Route path='/' element={authUser ? <Navigate to='home' /> : <LoginAndSignUp />} />
                <Route path='/home' element={authUser ? <Home /> : <Navigate to='/' />} />
            </Routes>
            <Toaster/>
        </div>
    )
}

export default App
