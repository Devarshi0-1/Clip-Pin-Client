import { TBasicResponse, TNote } from '@/types'
import { isEmpty } from '@/utils/userValidation'
import useStore from '@/zustand/store'
import axios, { AxiosError } from 'axios'
import { useState } from 'react'
import { toast } from 'sonner'

const useBookmarkNote = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const { newNote, newBookmarkNote, deleteNote, deleteBookmarkedNote, setSelectedNoteOpen } =
        useStore()

    const bookmarkNote = async (note: TNote, isBookmarked: boolean) => {
        const validationErrors: boolean = handleInputErrors(note._id)

        if (!validationErrors) return
        setLoading(true)
        try {
            const { data } = await axios.put<TBasicResponse<TNote>>(
                `${import.meta.env.VITE_BACKEND_URI}/notes/${note._id}`,
                { isBookmarked },
                { headers: { 'Content-Type': 'application/json' }, withCredentials: true },
            )

            toast.success(data.message)
            if (isBookmarked) {
                deleteNote(note)
                newBookmarkNote(data.data)
            } else {
                deleteBookmarkedNote(note)
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

    return { loading, bookmarkNote }
}

const handleInputErrors = (noteId: string) => {
    if (isEmpty(noteId)) {
        toast.error('Something went wrong! Try reloading')
        return false
    }

    return true
}

export default useBookmarkNote
