import { TSort } from '@/types'
import useStore from '@/zustand/store'

const useNoteSort = () => {
    const { notes, setNotes } = useStore()

    const sortNotes = (type: TSort) => {
        if (type === 'latest')
            setNotes(
                notes.sort(
                    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
                ),
            )
        else if (type === 'oldest')
            setNotes(
                notes.sort(
                    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
                ),
            )
        else if (type === 'updated')
            setNotes(
                notes.sort(
                    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
                ),
            )
    }

    return { sortNotes }
}

export default useNoteSort
