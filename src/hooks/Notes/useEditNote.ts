import { TBasicResponse, TNote } from '@/types'
import { isEmpty } from '@/utils/userValidation'
import useStore from '@/zustand/store'
import axios, { AxiosError } from 'axios'
import { useState } from 'react'
import { toast } from 'sonner'

const useEditNote = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const { editNote: editNoteInStore } = useStore()

    const editNote = async (noteId: string, title: string, content: string) => {
        const validationErrors: boolean = handleInputErrors(noteId)

        if (!validationErrors) return

        setLoading(true)
        try {
            const { data } = await axios.put<TBasicResponse<TNote>>(
                `${import.meta.env.VITE_BACKEND_URI}/notes/${noteId}`,
                { title, content },
                { headers: { 'Content-Type': 'application/json' }, withCredentials: true },
            )

            toast.success(data.message)
            editNoteInStore(data.data)
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

    return { loading, editNote }
}

const handleInputErrors = (noteId: string) => {
    if (isEmpty(noteId)) {
        toast.error('Something went wrong! Try reloading')

        // Remove
        console.log(noteId)
        return false
    }

    return true
}

export default useEditNote