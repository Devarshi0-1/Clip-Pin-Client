import { TBasicResponse, TNote } from '@/types'
import { isEmpty } from '@/utils/userValidation'
import useStore from '@/zustand/store'
import axios, { AxiosError } from 'axios'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { toast } from 'sonner'

const useArchivedNote = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const { newNote, newArchivedNote, deleteNote, deleteArchivedNote, setSelectedNoteOpen } =
        useStore()
    const location = useLocation()

    const archiveNote = async (noteId: string, isArchived: boolean) => {
        const validationErrors: boolean = handleInputErrors(noteId)

        if (!validationErrors) return
        setLoading(true)
        try {
            const { data } = await axios.put<TBasicResponse<TNote>>(
                `${import.meta.env.VITE_BACKEND_URI}/notes/${noteId}`,
                { isArchived },
                { headers: { 'Content-Type': 'application/json' }, withCredentials: true },
            )

            toast.success(data.message)

            if (location.pathname === '/home') {
                deleteNote(noteId)
                newArchivedNote(data.data)
            } else if (location.pathname === '/archived') {
                deleteArchivedNote(noteId)
                newNote(data.data)
            }
            setSelectedNoteOpen(false)
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

    return { loading, archiveNote }
}

const handleInputErrors = (noteId: string) => {
    if (isEmpty(noteId)) {
        toast.error('Something went wrong! Try reloading')
        return false
    }

    return true
}

export default useArchivedNote
