import { TBasicResponse } from '@/types'
import { isEmpty } from '@/utils/userValidation'
import useStore from '@/zustand/store'
import axios, { AxiosError } from 'axios'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { toast } from 'sonner'

const useDeleteNote = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const {
        deleteNote: deleteNoteInStore,
        deleteArchivedNote: deleteArchivedNoteInStore,
        notes,
        setNotes,
        setSelectedNoteOpen,
    } = useStore()
    const location = useLocation()

    const deleteNote = async (noteId: string) => {
        const validationErrors: boolean = handleInputErrors(noteId)

        if (!validationErrors) return
        const prevNotes = [...notes]

        location.pathname === '/home' && deleteNoteInStore(noteId)
        location.pathname === '/archived' && deleteArchivedNoteInStore(noteId)
        setSelectedNoteOpen(false)

        setLoading(true)
        try {
            const { data } = await axios.delete<TBasicResponse<null>>(
                `${import.meta.env.VITE_BACKEND_URI}/notes/${noteId}`,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                },
            )

            toast.success(data.message)

            location.pathname === '/home' && deleteNoteInStore(noteId)
            location.pathname === '/archived' && deleteArchivedNoteInStore(noteId)
            setSelectedNoteOpen(false)
        } catch (error) {
            const err = error as AxiosError<TBasicResponse<null>>

            if (err.response?.data.error) {
                toast.error(err.response.data.error.message)
                return
            }
            setNotes(prevNotes)
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    return { loading, deleteNote }
}

const handleInputErrors = (noteId: string) => {
    if (isEmpty(noteId)) {
        toast.error('Something went wrong! Try reloading')
        return false
    }

    return true
}

export default useDeleteNote
