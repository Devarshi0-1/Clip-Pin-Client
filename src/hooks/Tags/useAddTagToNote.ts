import { TBasicResponse, TTag } from '@/types'
import { isEmpty } from '@/utils/userValidation'
import useStore from '@/zustand/store'
import axios, { AxiosError } from 'axios'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { toast } from 'sonner'

const useAddTagToNote = () => {
    const { addTagToNote: addTagToNoteInStore, addTagToArchivedNote: addTagToArchivedNoteInStore } =
        useStore()
    const [loading, setLoading] = useState<boolean>(false)
    const location = useLocation()

    const addTagToNote = async (noteId: string, tagId: string) => {
        const validationErrors: boolean = handleInputErrors(noteId, tagId)

        if (!validationErrors) return

        setLoading(true)
        try {
            const { data } = await axios.post<TBasicResponse<TTag>>(
                `${import.meta.env.VITE_BACKEND_URI}/tags/${noteId}/${tagId}`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                },
            )

            toast.success(data.message)

            location.pathname === '/home' && addTagToNoteInStore(noteId, data.data)
            location.pathname === '/archived' && addTagToArchivedNoteInStore(noteId, data.data)
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

    return { loading, addTagToNote }
}

const handleInputErrors = (noteId: string, tagId: string) => {
    if (isEmpty(noteId) && isEmpty(tagId)) {
        toast.error('Something went wrong! Try reloading')
        return false
    }

    return true
}

export default useAddTagToNote
