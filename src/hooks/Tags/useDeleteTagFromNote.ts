import { TBasicResponse } from '@/types'
import { isEmpty } from '@/utils/userValidation'
import useStore from '@/zustand/store'
import axios, { AxiosError } from 'axios'
import { useState } from 'react'
import { toast } from 'sonner'

const useDeleteTagFromNote = () => {
    const { removeTagFromNote: removeTagFromNoteInStore } = useStore()
    const [loading, setLoading] = useState<boolean>(false)

    const removeTagFromNote = async (noteId: string, tagId: string) => {
        const validationErrors: boolean = handleInputErrors(noteId, tagId)

        if (!validationErrors) return

        setLoading(true)
        try {
            const { data } = await axios.delete<TBasicResponse<null>>(
                `${import.meta.env.VITE_BACKEND_URI}/tags/${noteId}/${tagId}`,
                {},
            )

            toast.success(data.message)
            removeTagFromNoteInStore(noteId, tagId)
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

    return { loading, removeTagFromNote }
}

const handleInputErrors = (noteId: string, tagId: string) => {
    if (isEmpty(noteId) && isEmpty(tagId)) {
        toast.error('Something went wrong! Try reloading')

        // Remove
        console.log(noteId, tagId)
        return false
    }

    return true
}

export default useDeleteTagFromNote
