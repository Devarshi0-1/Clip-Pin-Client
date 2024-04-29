import { TNote, TSort } from '@/types'
import useStore from '@/zustand/store'
import { useLocation } from 'react-router-dom'

const useNoteSort = () => {
    const { setNotes, setArchivedNotes } = useStore()
    const location = useLocation()

    const sortNotes = (notes: TNote[], type: TSort) => {
        if (type === 'latest') {
            location.pathname === '/home'
                ? setNotes(
                      notes.sort(
                          (a, b) =>
                              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
                      ),
                  )
                : setArchivedNotes(
                      notes.sort(
                          (a, b) =>
                              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
                      ),
                  )
        } else if (type === 'oldest') {
            location.pathname === '/home'
                ? setNotes(
                      notes.sort(
                          (a, b) =>
                              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
                      ),
                  )
                : setArchivedNotes(
                      notes.sort(
                          (a, b) =>
                              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
                      ),
                  )
        } else if (type === 'updated') {
            setNotes(
                notes.sort(
                    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
                ),
            )
            location.pathname === '/home'
                ? setNotes(
                      notes.sort(
                          (a, b) =>
                              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
                      ),
                  )
                : setArchivedNotes(
                      notes.sort(
                          (a, b) =>
                              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
                      ),
                  )
        }
    }

    return { sortNotes }
}

export default useNoteSort
