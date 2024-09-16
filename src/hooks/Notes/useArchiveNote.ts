import { TBasicResponse, TNote } from '@/types'
import { isEmpty } from '@/utils/userValidation'
import useStore from '@/zustand/store'
import axios, { AxiosError } from 'axios'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { toast } from 'sonner'

const useArchivedNote = () => {
    const newNote = useStore(state => state.newNote)
    const newArchivedNote = useStore(state => state.newArchivedNote)
    const deleteNote = useStore(state => state.deleteNote)
    const deleteArchivedNote = useStore(state => state.deleteArchivedNote)
    const setSelectedNoteOpen = useStore(state => state.setSelectedNoteOpen)
    
    const [loading, setLoading] = useState<boolean>(false)
    
    const location = useLocation()

    const archiveNote = async (note: TNote, isArchived: boolean) => {
        const validationErrors: boolean = handleInputErrors(note._id)

        if (!validationErrors) return
        setLoading(true)
        try {
            const { data } = await axios.put<TBasicResponse<TNote>>(
                `${import.meta.env.VITE_BACKEND_URI}/notes/${note._id}`,
                { isArchived },
                { headers: { 'Content-Type': 'application/json' }, withCredentials: true },
            )

            toast.success(data.message)
            if (location.pathname === '/home' && data.data.isBookmarked)
                return toast.error('Cannot archive a bookmarked note!')
            else if (location.pathname === '/home') {
                deleteNote(note)
                newArchivedNote(data.data)
            } else if (location.pathname === '/archived') {
                deleteArchivedNote(note)
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
