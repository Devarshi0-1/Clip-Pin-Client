import { TBasicResponse, TNote } from '@/types'
import { isEmpty } from '@/utils/userValidation'
import useStore from '@/zustand/store'
import axios, { AxiosError } from 'axios'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { toast } from 'sonner'

const useBatchDeleteNote = () => {
    const deleteNoteInStore = useStore((state) => state.deleteNote)
    const deleteArchivedNoteInStore = useStore((state) => state.deleteArchivedNote)
    const deleteBookmarkedNoteInStore = useStore((state) => state.deleteBookmarkedNote)
    const notes = useStore((state) => state.notes)
    const removeTab = useStore((state) => state.removeTab)
    const setNotes = useStore((state) => state.setNotes)
    const setSelectedNoteOpen = useStore((state) => state.setSelectedNoteOpen)
    const setSelectedNote = useStore((state) => state.setSelectedNote)

    const [loading, setLoading] = useState<boolean>(false)

    const location = useLocation()

    const batchDeleteNotes = async (notesToDelete: TNote[]) => {
        const notesToDeleteIds = notesToDelete.map((note) => note._id)

        const validationErrors: boolean = handleInputErrors(...notesToDeleteIds)

        if (!validationErrors) return
        const prevNotes = [...notes]

        notesToDelete.forEach((note) => {
            if (location.pathname === '/home' && note.isBookmarked)
                deleteBookmarkedNoteInStore(note)
            else if (location.pathname === '/home') deleteNoteInStore(note)
            else if (location.pathname === '/archived') deleteArchivedNoteInStore(note)
            removeTab(note)
        })

        setSelectedNoteOpen(false)
        setLoading(true)
        try {
            const { data } = await axios.delete<TBasicResponse<null>>(
                `${import.meta.env.VITE_BACKEND_URI}/notes/batch-delete`,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                    data: { selectedNotes: notesToDeleteIds },
                },
            )

            toast.success(data.message)

            notesToDelete.forEach((note) => {
                location.pathname === '/home' && deleteNoteInStore(note)
                location.pathname === '/archived' && deleteArchivedNoteInStore(note)
            })
            setSelectedNoteOpen(false)
            setSelectedNote(null)
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

    return { loading, batchDeleteNotes }
}

const handleInputErrors = (...noteIds: string[]) => {
    if (isEmpty(...noteIds)) {
        toast.error('Something went wrong! Try reloading')
        return false
    }

    return true
}

export default useBatchDeleteNote
