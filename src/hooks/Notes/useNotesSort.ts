import { TNote, TNotes, TSort } from '@/types'
import useStore from '@/zustand/store'

const useNoteSort = () => {
    const { setNotes, setArchivedNotes, setBookmarkedNotes } = useStore()

    const sortNotes = (notes: TNote[], noteType: TNotes, type: TSort) => {
        switch (type) {
            case 'latest':
                switch (noteType) {
                    case 'notes':
                        setNotes(
                            notes.sort(
                                (a, b) =>
                                    new Date(b.createdAt).getTime() -
                                    new Date(a.createdAt).getTime(),
                            ),
                        )
                        break

                    case 'archivedNotes':
                        setArchivedNotes(
                            notes.sort(
                                (a, b) =>
                                    new Date(b.createdAt).getTime() -
                                    new Date(a.createdAt).getTime(),
                            ),
                        )
                        break

                    case 'bookmarkedNotes':
                        setBookmarkedNotes(
                            notes.sort(
                                (a, b) =>
                                    new Date(b.createdAt).getTime() -
                                    new Date(a.createdAt).getTime(),
                            ),
                        )
                        break

                    default:
                        break
                }
                break

            case 'oldest':
                switch (noteType) {
                    case 'notes':
                        setNotes(
                            notes.sort(
                                (a, b) =>
                                    new Date(a.createdAt).getTime() -
                                    new Date(b.createdAt).getTime(),
                            ),
                        )
                        break

                    case 'archivedNotes':
                        setArchivedNotes(
                            notes.sort(
                                (a, b) =>
                                    new Date(a.createdAt).getTime() -
                                    new Date(b.createdAt).getTime(),
                            ),
                        )
                        break

                    case 'bookmarkedNotes':
                        setBookmarkedNotes(
                            notes.sort(
                                (a, b) =>
                                    new Date(a.createdAt).getTime() -
                                    new Date(b.createdAt).getTime(),
                            ),
                        )
                        break

                    default:
                        break
                }
                break

            case 'updated':
                switch (noteType) {
                    case 'notes':
                        setNotes(
                            notes.sort(
                                (a, b) =>
                                    new Date(b.updatedAt).getTime() -
                                    new Date(a.updatedAt).getTime(),
                            ),
                        )
                        break

                    case 'archivedNotes':
                        setArchivedNotes(
                            notes.sort(
                                (a, b) =>
                                    new Date(b.updatedAt).getTime() -
                                    new Date(a.updatedAt).getTime(),
                            ),
                        )
                        break

                    case 'bookmarkedNotes':
                        setBookmarkedNotes(
                            notes.sort(
                                (a, b) =>
                                    new Date(b.updatedAt).getTime() -
                                    new Date(a.updatedAt).getTime(),
                            ),
                        )
                        break

                    default:
                        break
                }
                break

            default:
                throw TypeError('Invalid Type TSort or TNotes')
        }
    }

    return { sortNotes }
}

export default useNoteSort
