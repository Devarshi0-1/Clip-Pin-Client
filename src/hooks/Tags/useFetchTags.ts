import { TBasicResponse, TTag } from '@/types'
import useStore from '@/zustand/store'
import axios, { AxiosError } from 'axios'
import { useState } from 'react'
import { toast } from 'sonner'

const useFetchTags = () => {
    const { setTags } = useStore()

    const [loading, setLoading] = useState<boolean>(false)

    const getUserTags = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get<TBasicResponse<TTag[]>>(
                `${import.meta.env.VITE_BACKEND_URI}/tags/my`,
                { withCredentials: true },
            )

            setTags(data.data)

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

    return { loading, getUserTags }
}

export default useFetchTags
