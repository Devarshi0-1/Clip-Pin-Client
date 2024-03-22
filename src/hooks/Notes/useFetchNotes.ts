import { TBasicResponse, TNote } from '@/types'
import useStore from '@/zustand/store'
import axios, { AxiosError } from 'axios'
import { useState } from 'react'
import { toast } from 'sonner'

const useFetchNotes = () => {
    const { setNotes } = useStore()

    const [loading, setLoading] = useState<boolean>(false)

    const getUserNotes = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get<TBasicResponse<TNote[]>>(
                `${import.meta.env.VITE_BACKEND_URI}/notes/my`, {
                    withCredentials: true
                }
            )

            setNotes(data.data)

            if (data.data.length) toast.success(data.message)
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

    return { loading, getUserNotes }
}

export default useFetchNotes
