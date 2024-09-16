import type { Dispatch, FC, ReactNode, SetStateAction } from 'react'
import { createContext, useContext, useState } from 'react'

interface AuthContextProps {
    children: ReactNode
}

export type TUser = {
    _id: string
    username: string
    fullName: string
    gender: string
    password?: string
} | null

interface AuthUserContext {
    authUser: TUser
    setAuthUser: Dispatch<SetStateAction<TUser>>
}

const AuthContext = createContext<Partial<AuthUserContext>>({})

export const AuthContextProvider: FC<AuthContextProps> = ({ children }) => {
    const [authUser, setAuthUser] = useState<TUser>(JSON.parse(localStorage.getItem('user')!))

    return <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => {
    return useContext(AuthContext)
}
