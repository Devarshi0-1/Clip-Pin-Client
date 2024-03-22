import { TBasicResponse } from '@/types'
import axios, { AxiosError } from 'axios'
import { useState } from 'react'
import { toast } from 'sonner'
import { TUser, useAuthContext } from '../../context/AuthContext'
import { isEmpty } from '../../utils/userValidation'

type SignUp = (fullName: string, username: string, password: string) => Promise<void>

type HandleInputErrors = (fullName: string, username: string, password: string) => boolean

const useSignUp = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const { setAuthUser } = useAuthContext()

    const signUp: SignUp = async (fullName, username, password) => {
        const validationErrors: boolean = handleInputErrors(fullName, username, password)

        if (!validationErrors) return

        setLoading(true)
        try {
            const { data } = await axios.post<TBasicResponse<TUser>>(
                `${import.meta.env.VITE_BACKEND_URI}/auth/register`,
                {
                    fullName,
                    username,
                    password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                },
            )

            toast.success(data.message)
            localStorage.setItem('user', JSON.stringify(data.data))
            if (setAuthUser) setAuthUser(data.data)
        } catch (error) {
            const err = error as AxiosError<TBasicResponse<null>>

            if (err?.response?.data?.error?.message) {
                toast.error(err.response.data.error.message)
                return
            }
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    return { loading, signUp }
}

const handleInputErrors: HandleInputErrors = (fullName, username, password) => {
    if (isEmpty(fullName, username, password)) {
        toast.error('Please Fill All The Fields!')
        return false
    }

    if (password.length < 6) {
        toast.error('Passwords must be at least 6 characters!')
        return false
    }

    return true
}

export default useSignUp
