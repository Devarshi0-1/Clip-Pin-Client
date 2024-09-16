import { TBasicResponse, TNote } from '@/types'
import useStore from '@/zustand/store'
import axios, { AxiosError } from 'axios'
import { useState } from 'react'
import { toast } from 'sonner'

const useFetchNotes = () => {
    const setNotes = useStore((state) => state.setNotes)
    const setArchivedNotes = useStore((state) => state.setArchivedNotes)
    const setBookmarkedNotes = useStore((state) => state.setBookmarkedNotes)

    const [loading, setLoading] = useState<boolean>(false)

    const getUserNotes = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get<TBasicResponse<TNote[]>>(
                `${import.meta.env.VITE_BACKEND_URI}/notes/my`,
                {
                    withCredentials: true,
                },
            )

            const tempNotes: TNote[] = []
            const tempArchivedNotes: TNote[] = []
            const tempBookmarkedNotes: TNote[] = []

            data.data.forEach((note) => {
                if (note.isBookmarked) tempBookmarkedNotes.push(note)
                else if (note.isArchived) tempArchivedNotes.push(note)
                else tempNotes.push(note)
            })

            setNotes(tempNotes)
            setBookmarkedNotes(tempBookmarkedNotes)
            setArchivedNotes(tempArchivedNotes)

            if (data.data.length) toast.success(data.message)
        } catch (error: unknown) {
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

    return { loading, getUserNotes }
}

export default useFetchNotes
