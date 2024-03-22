import { TBasicResponse, TTag } from '@/types'
import { isEmpty } from '@/utils/userValidation'
import useStore from '@/zustand/store'
import axios, { AxiosError } from 'axios'
import { useState } from 'react'
import { toast } from 'sonner'

const useEditTag = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const { editTag: editTagInStore } = useStore()

    const editTag = async (tagId: string, name: string) => {
        const validationErrors: boolean = handleInputErrors(tagId, name)

        if (!validationErrors) return

        setLoading(true)
        try {
            const { data } = await axios.put<TBasicResponse<TTag>>(
                `${import.meta.env.VITE_BACKEND_URI}/tags/${tagId}`,
                { name },
                { headers: { 'Content-Type': 'application/json' }, withCredentials: true },
            )

            toast.success(data.message)
            editTagInStore(data.data)
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

    return { loading, editTag }
}

const handleInputErrors = (tagId: string, name: string) => {
    if (isEmpty(tagId)) {
        toast.error('Something went wrong! Try reloading')

        // Remove
        console.log(tagId)
        return false
    } else if (isEmpty(name)) {
        toast.error('Please Tag Name!')
        return false
    }

    return true
}

export default useEditTag
