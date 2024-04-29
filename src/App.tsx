import { Toaster } from '@/components/ui/sonner'
import type { FC } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import LogoutButton from './components/LogoutButton'
import SharedComponents from './components/SharedComponents'
import { useAuthContext } from './context/AuthContext'
import Archived from './pages/Archived'
import Home from './pages/Home'
import LoginAndSignUp from './pages/LoginAndSignUp'

const App: FC = () => {
    const { authUser } = useAuthContext()

    return (
        <div className='min-h-screen min-w-full'>
            <Routes>
                <Route path='/' element={authUser ? <Navigate to='home' /> : <LoginAndSignUp />} />
                <Route
                    path='/home'
                    element={
                        authUser ? (
                            <SharedComponents>
                                <Home />
                            </SharedComponents>
                        ) : (
                            <Navigate to='/' />
                        )
                    }
                />
                <Route
                    path='/archived'
                    element={
                        authUser ? (
                            <SharedComponents>
                                <Archived />
                            </SharedComponents>
                        ) : (
                            <Navigate to='/' />
                        )
                    }
                />
            </Routes>
            <LogoutButton />
            <Toaster />
        </div>
    )
}

export default App
