import { TBasicResponse } from '@/types'
import axios, { AxiosError } from 'axios'
import { useState } from 'react'
import { toast } from 'sonner'
import { useAuthContext } from '../../context/AuthContext'

const useLogout = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const { setAuthUser } = useAuthContext()

    const logout = async () => {
        setLoading(true)
        try {
            const { data } = await axios.post<TBasicResponse<null>>(
                `${import.meta.env.VITE_BACKEND_URI}/auth/logout`,
                {},
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                },
            )

            toast.success(data.message)
            localStorage.removeItem('user')
            if (setAuthUser) setAuthUser(null)
        } catch (error: any) {
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

    return { loading, logout }
}
export default useLogout
