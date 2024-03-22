import { TBasicResponse, TTag } from '@/types'
import { isEmpty } from '@/utils/userValidation'
import useStore from '@/zustand/store'
import axios, { AxiosError } from 'axios'
import { useState } from 'react'
import { toast } from 'sonner'

const useCreateTag = () => {
    const { newTag } = useStore()
    const [loading, setLoading] = useState<boolean>(false)

    const addTag = async (name: string) => {
        const validationErrors: boolean = handleInputErrors(name)

        if (!validationErrors) return

        setLoading(true)
        try {
            const { data } = await axios.post<TBasicResponse<TTag>>(
                `${import.meta.env.VITE_BACKEND_URI}/tags/new`,
                {
                    name,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                },
            )

            toast.success(data.message)
            newTag(data.data)
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

    return { loading, addTag }
}

const handleInputErrors = (name: string) => {
    if (isEmpty(name)) {
        toast.error('Please enter Tag Name!')
        return false
    }

    return true
}

export default useCreateTag
