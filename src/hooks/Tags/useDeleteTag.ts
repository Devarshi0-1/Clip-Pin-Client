import { TBasicResponse } from '@/types'
import { isEmpty } from '@/utils/userValidation'
import useStore from '@/zustand/store'
import axios, { AxiosError } from 'axios'
import { useState } from 'react'
import { toast } from 'sonner'

const useDeleteTag = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const { deleteTag: deleteTagInStore } = useStore()

    const deleteTag = async (tagId: string) => {
        const validationErrors: boolean = handleInputErrors(tagId)

        if (!validationErrors) return

        setLoading(true)
        try {
            const { data } = await axios.delete<TBasicResponse<null>>(
                `${import.meta.env.VITE_BACKEND_URI}/tags/${tagId}`,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                },
            )

            toast.success(data.message)

            deleteTagInStore(tagId)
        } catch (error) {
            const err = error as AxiosError<TBasicResponse<null>>

            if (err.response?.data.error) {
                toast.error(err.response.data.error.message)
                return
            }
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    return { loading, deleteTag }
}

const handleInputErrors = (tagId: string) => {
    if (isEmpty(tagId)) {
        toast.error('Something went wrong! Try reloading')

        // Remove
        console.log(tagId)
        return false
    }

    return true
}

export default useDeleteTag
