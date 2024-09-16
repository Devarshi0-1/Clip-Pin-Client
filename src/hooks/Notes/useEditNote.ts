import { TBasicResponse, TNote } from '@/types'
import { isEmpty } from '@/utils/userValidation'
import useStore from '@/zustand/store'
import axios, { AxiosError } from 'axios'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { toast } from 'sonner'

const useEditNote = () => {
    const editNoteInStore = useStore((state) => state.editNote)
    const editArchivedNoteInStore = useStore((state) => state.editArchivedNote)
    const editBookmarkedNoteInStore = useStore((state) => state.editBookmarkedNote)

    const [loading, setLoading] = useState<boolean>(false)

    const location = useLocation()

    const editNote = async (note: TNote, title: string, content: string) => {
        const validationErrors: boolean = handleInputErrors(note._id)

        if (!validationErrors) return
        setLoading(true)
        try {
            const { data } = await axios.put<TBasicResponse<TNote>>(
                `${import.meta.env.VITE_BACKEND_URI}/notes/${note._id}`,
                { title, content },
                { headers: { 'Content-Type': 'application/json' }, withCredentials: true },
            )

            toast.success(data.message)

            if (location.pathname === '/home' && data.data.isBookmarked)
                editBookmarkedNoteInStore(data.data)
            else if (location.pathname === '/home') editNoteInStore(data.data)
            else if (location.pathname === '/archived') editArchivedNoteInStore(data.data)
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
        return false
    }

    return true
}

export default useEditNote
