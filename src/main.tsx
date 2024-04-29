import { ThemeProvider } from '@/components/theme-provider'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.tsx'
import { AuthContextProvider } from './context/AuthContext.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Router>
            <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
                <AuthContextProvider>
                    <App />
                </AuthContextProvider>
            </ThemeProvider>
        </Router>
    </React.StrictMode>
)
