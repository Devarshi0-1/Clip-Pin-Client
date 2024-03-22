import { TBasicResponse } from '@/types'
import axios, { AxiosError } from 'axios'
import { useState } from 'react'
import { toast } from 'sonner'
import { TUser, useAuthContext } from '../../context/AuthContext'
import { isEmpty } from '../../utils/userValidation'

const useLogin = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const { setAuthUser } = useAuthContext()

    const login = async (username: string, password: string) => {
        const validationErrors = handleInputErrors(username, password)

        if (!validationErrors) return

        setLoading(true)
        try {
            const { data } = await axios.post<TBasicResponse<TUser>>(
                `${import.meta.env.VITE_BACKEND_URI}/auth/login`,
                { username, password },
                { headers: { 'Content-Type': 'application/json' }, withCredentials: true },
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

    return { loading, login }
}

const handleInputErrors = (username: string, password: string) => {
    if (isEmpty(username, password)) {
        toast.error('Please Fill All The Fields!')
        return false
    }

    return true
}

export default useLogin
