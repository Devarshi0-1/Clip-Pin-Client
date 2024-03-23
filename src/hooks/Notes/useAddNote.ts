import { TBasicResponse, TNote } from '@/types'
import { isEmpty } from '@/utils/userValidation'
import useStore from '@/zustand/store'
import axios, { AxiosError } from 'axios'
import { useState } from 'react'
import { toast } from 'sonner'

const useAddNote = () => {
    const { newNote, deleteNote } = useStore()
    const [loading, setLoading] = useState<boolean>(false)

    const addNote = async (title: string, content: string) => {
        const validationErrors: boolean = handleInputErrors(title, content)

        if (!validationErrors) return

        setLoading(true)

        newNote({
            title,
            content,
            _id: 'temporaryId',
            owner: 'temporaryOwner',
            tags: [],
            createdAt: new Date(Date.now()),
            updatedAt: new Date(Date.now()),
        })

        try {
            const { data } = await axios.post<TBasicResponse<TNote>>(
                `${import.meta.env.VITE_BACKEND_URI}/notes/new`,
                {
                    title,
                    content,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                },
            )

            toast.success(data.message)
            newNote(data.data)
            deleteNote('temporaryId')
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

    return { loading, addNote }
}

const handleInputErrors = (title: string, content: string) => {
    if (isEmpty(title) && isEmpty(content)) {
        toast.error('Please enter Title or Content!')
        return false
    }

    return true
}

export default useAddNote
