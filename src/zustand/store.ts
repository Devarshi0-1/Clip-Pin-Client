import { TNote, TTag } from '@/types'
import { create } from 'zustand'

interface store {
    selectedNoteOpen: boolean
    setSelectedNoteOpen: (selectedNoteOpen: boolean) => void
    tagOpen: boolean
    setTagOpen: (tagOpen: boolean) => void
    selectedNote: TNote | null
    setSelectedNote: (selectedNote: TNote) => void
    notes: TNote[] | []
    setNotes: (newNotes: TNote[] | []) => void
    newNote: (newNote: TNote) => void
    deleteNote: (noteId: string) => void
    editNote: (newNote: TNote) => void
    searchTerm: string
    setSearchTerm: (newSearchTerm: string) => void
    filteredNotes: TNote[] | []
    setFilteredNotes: () => void
    tags: TTag[] | []
    setTags: (newTags: TTag[] | []) => void
    newTag: (newTag: TTag) => void
    deleteTag: (tagId: string) => void
    editTag: (newTag: TTag) => void
    addTagToNote: (noteId: string, tag: TTag) => void
    removeTagFromNote: (noteId: string, tagId: string) => void
}

const useStore = create<store>((set) => ({
    selectedNoteOpen: false,
    setSelectedNoteOpen: (selectedNoteOpen) => set({ selectedNoteOpen }),
    tagOpen: false,
    setTagOpen: (tagOpen) => set({ tagOpen }),
    selectedNote: null,
    setSelectedNote: (newSelectedNote) => set({ selectedNote: newSelectedNote }),
    notes: [],
    setNotes: (newNotes) => set({ notes: newNotes }),
    newNote: (newNote) => set((state) => ({ notes: [newNote, ...state.notes] })),
    deleteNote: (noteId) =>
        set((state) => ({
            notes: state.notes.filter((note) => note._id !== noteId),
        })),
    editNote: (newNote) =>
        set((state) => ({
            notes: state.notes.map((note) => (note._id === newNote._id ? newNote : note)),
        })),
    searchTerm: '',
    setSearchTerm: (newSearchTerm) =>
        set(() => ({
            searchTerm: newSearchTerm,
        })),
    filteredNotes: [],
    setFilteredNotes: () =>
        set((state) => ({
            filteredNotes: state.notes?.filter((note) => {
                const filterTermLowerCase = state.searchTerm.toLowerCase()

                const isShown =
                    note.title?.toLowerCase().includes(filterTermLowerCase) ||
                    note.content?.toLowerCase().includes(filterTermLowerCase) ||
                    note.tags.find((tag) => tag.name.toLowerCase().includes(filterTermLowerCase))

                return isShown
            }),
        })),
    tags: [],
    setTags: (newTags) => set(() => ({ tags: newTags })),
    newTag: (newTag) => set((state) => ({ tags: [newTag, ...state.tags] })),
    deleteTag: (tagId) =>
        set((state) => ({
            tags: state.tags.filter((tag) => tag._id !== tagId),
            notes: state.notes.map((note) => {
                note.tags = note.tags.filter((tag) => tag._id !== tagId)
                return note
            }),
        })),
    editTag: (newTag) =>
        set((state) => ({
            tags: state.tags.map((tag) => (tag._id === newTag._id ? newTag : tag)),
            notes: state.notes.map((note) => {
                note.tags.map((tag) => {
                    if (tag._id === newTag._id) tag.name = newTag.name
                    return tag
                })
                return note
            }),
        })),
    addTagToNote: (noteId, tag) =>
        set((state) => ({
            notes: state.notes.map((note) => {
                if (note._id === noteId) note.tags = [...note.tags, tag]
                return note
            }),
        })),
    removeTagFromNote: (noteId, tagId) =>
        set((state) => ({
            notes: state.notes.map((note) => {
                if (note._id === noteId) note.tags = note.tags.filter((tag) => tag._id !== tagId)
                return note
            }),
        })),
}))

export default useStore
