import { Toaster } from '@/components/ui/sonner'
import type { FC } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SharedComponents from './components/SharedLayout/SharedComponents'
import { useAuthContext } from './context/AuthContext'
import LoginAndSignUp from './pages/LoginAndSignUp'

const App: FC = () => {
    const { authUser } = useAuthContext()

    return (
        <div className='min-h-screen min-w-full'>
            <Routes>
                <Route path='/' element={authUser ? <Navigate to='home' /> : <LoginAndSignUp />} />
                <Route
                    path='/home'
                    element={authUser ? <SharedComponents /> : <Navigate to='/' />}
                />
                <Route
                    path='/archived'
                    element={authUser ? <SharedComponents /> : <Navigate to='/' />}
                />
                <Route
                    path='/note/:noteId'
                    element={authUser ? <SharedComponents /> : <Navigate to='/' />}
                />
            </Routes>
            <Toaster />
        </div>
    )
}

export default App
