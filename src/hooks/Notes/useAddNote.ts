import { TBasicResponse, TNote } from '@/types'
import { isEmpty } from '@/utils/userValidation'
import useStore from '@/zustand/store'
import axios, { AxiosError } from 'axios'
import { useState } from 'react'
import { toast } from 'sonner'

const useAddNote = () => {
    const newNote = useStore((state) => state.newNote)

    const [loading, setLoading] = useState<boolean>(false)

    const addNote = async (title: string, content: string) => {
        const validationErrors: boolean = handleInputErrors(title, content)

        if (!validationErrors) return

        setLoading(true)
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
