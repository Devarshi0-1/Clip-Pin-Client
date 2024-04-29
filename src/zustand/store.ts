import { TNote, TTag } from '@/types'
import { create } from 'zustand'

interface store {
    selectedNoteOpen: boolean
    setSelectedNoteOpen: (selectedNoteOpen: boolean) => void
    tagOpen: boolean
    setTagOpen: (tagOpen: boolean) => void
    sidebarOpen: boolean
    setSidebarOpen: (sidebarOpen: boolean) => void
    selectedNote: TNote | null
    setSelectedNote: (selectedNote: TNote) => void
    notes: TNote[] | []
    archivedNotes: TNote[] | []
    setNotes: (newNotes: TNote[] | []) => void
    setArchivedNotes: (newNotes: TNote[] | []) => void
    newNote: (newNote: TNote) => void
    newArchivedNote: (newNote: TNote) => void
    deleteNote: (noteId: string) => void
    deleteArchivedNote: (noteId: string) => void
    editNote: (newNote: TNote) => void
    editArchivedNote: (newNote: TNote) => void
    filteredNotes: TNote[] | []
    setFilteredNotes: (data: TNote[], searchParam: string) => void
    tags: TTag[] | []
    setTags: (newTags: TTag[] | []) => void
    newTag: (newTag: TTag) => void
    deleteTag: (tagId: string) => void
    editTag: (newTag: TTag) => void
    addTagToNote: (noteId: string, tag: TTag) => void
    addTagToArchivedNote: (noteId: string, tag: TTag) => void
    removeTagFromNote: (noteId: string, tagId: string) => void
    removeTagFromArchivedNote: (noteId: string, tagId: string) => void
}

const useStore = create<store>((set) => ({
    selectedNoteOpen: false,
    setSelectedNoteOpen: (selectedNoteOpen) => set({ selectedNoteOpen }),
    tagOpen: false,
    setTagOpen: (tagOpen) => set({ tagOpen }),
    sidebarOpen: false,
    setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
    selectedNote: null,
    setSelectedNote: (newSelectedNote) => set({ selectedNote: newSelectedNote }),
    notes: [],
    archivedNotes: [],
    setNotes: (newNotes) => set({ notes: newNotes }),
    setArchivedNotes: (newNotes) => set({ archivedNotes: newNotes }),
    newNote: (newNote) => set((state) => ({ notes: [newNote, ...state.notes] })),
    newArchivedNote: (newNote) => set((state) => ({ archivedNotes: [newNote, ...state.archivedNotes] })),
    deleteNote: (noteId) =>
        set((state) => ({
            notes: state.notes.filter((note) => note._id !== noteId),
        })),
    deleteArchivedNote: (noteId) =>
        set((state) => ({
            archivedNotes: state.archivedNotes.filter((note) => note._id !== noteId),
        })),
    editNote: (newNote) =>
        set((state) => ({
            notes: state.notes.map((note) => (note._id === newNote._id ? newNote : note)),
        })),
    editArchivedNote: (newNote) =>
        set((state) => ({
            archivedNotes: state.archivedNotes.map((note) =>
                note._id === newNote._id ? newNote : note,
            ),
        })),
    filteredNotes: [],
    setFilteredNotes: (data, searchParam) =>
        set(() => ({
            filteredNotes: data?.filter((note) => {
                if (!searchParam) return
                const filterTermLowerCase = searchParam.toLowerCase()

                return (
                    note.title?.toLowerCase().includes(filterTermLowerCase) ||
                    note.content?.toLowerCase().includes(filterTermLowerCase) ||
                    note.tags.find((tag) => tag.name.toLowerCase().includes(filterTermLowerCase))
                )
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
    addTagToArchivedNote: (noteId, tag) =>
        set((state) => ({
            archivedNotes: state.archivedNotes.map((note) => {
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
    removeTagFromArchivedNote: (noteId, tagId) =>
        set((state) => ({
            archivedNotes: state.archivedNotes.map((note) => {
                if (note._id === noteId) note.tags = note.tags.filter((tag) => tag._id !== tagId)
                return note
            }),
        })),
}))

export default useStore
