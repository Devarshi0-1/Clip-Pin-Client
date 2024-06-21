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
    setSelectedNote: (selectedNote: TNote | null) => void

    // Normal Notes
    notes: Array<TNote> | []
    setNotes: (newNotes: Array<TNote> | []) => void
    newNote: (newNote: TNote) => void
    deleteNote: (newNote: TNote) => void
    editNote: (newNote: TNote) => void

    // Archived Notes
    archivedNotes: Array<TNote> | []
    setArchivedNotes: (newNotes: Array<TNote> | []) => void
    newArchivedNote: (newNote: TNote) => void
    deleteArchivedNote: (newNote: TNote) => void
    editArchivedNote: (newNote: TNote) => void

    // Bookmarked Notes
    bookmarkedNotes: Array<TNote> | []
    deleteBookmarkedNote: (newNote: TNote) => void
    newBookmarkNote: (note: TNote) => void
    editBookmarkedNote: (newNote: TNote) => void
    setBookmarkedNotes: (newNotes: Array<TNote> | []) => void

    // Filtered Notes
    filteredNotes: Array<TNote> | []
    setFilteredNotes: (data: Array<TNote>, searchParam: string) => void

    // Tags
    tags: Array<TTag> | []
    setTags: (newTags: Array<TTag> | []) => void
    newTag: (newTag: TTag) => void
    deleteTag: (tagId: string) => void
    editTag: (newTag: TTag) => void
    addTagToNote: (newNote: TNote, tag: TTag) => void
    addTagToArchivedNote: (newNote: TNote, tag: TTag) => void
    removeTagFromNote: (newNote: TNote, tagId: string) => void
    removeTagFromBookmarkedNote: (newNote: TNote, tagId: string) => void
    removeTagFromArchivedNote: (newNote: TNote, tagId: string) => void
    addTagToBookmarkedNote: (newNote: TNote, tag: TTag) => void

    // Tab System
    tabList: Array<TNote>
    addTab: (newNote: TNote) => void
    removeTab: (newNote: TNote) => void

    highlightMode: boolean
    setHighlightMode: (mode: boolean) => void
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

    // Normal Notes
    notes: [],
    setNotes: (newNotes) => set({ notes: newNotes }),
    newNote: (newNote) => set((state) => ({ notes: [newNote, ...state.notes] })),
    editNote: (newNote) =>
        set((state) => ({
            notes: state.notes.map((note) => (note._id === newNote._id ? newNote : note)),
        })),
    deleteNote: (newNote) =>
        set((state) => ({
            notes: state.notes.filter((note) => note._id !== newNote._id),
        })),

    // Bookmarked Notes
    bookmarkedNotes: [],
    setBookmarkedNotes: (newNotes) => set({ bookmarkedNotes: newNotes }),
    newBookmarkNote: (newNote) =>
        set((state) => ({
            bookmarkedNotes: [newNote, ...state.bookmarkedNotes],
        })),
    deleteBookmarkedNote: (newNote) =>
        set((state) => ({
            bookmarkedNotes: state.bookmarkedNotes.filter((note) => note._id !== newNote._id),
            tabList: state.tabList.filter((note) => note._id !== newNote._id),
        })),
    editBookmarkedNote: (newNote) =>
        set((state) => ({
            bookmarkedNotes: state.bookmarkedNotes.map((note) =>
                note._id === newNote._id ? newNote : note,
            ),
        })),

    // Archived Notes
    archivedNotes: [],
    setArchivedNotes: (newNotes) => set({ archivedNotes: newNotes }),
    newArchivedNote: (newNote) =>
        set((state) => ({ archivedNotes: [newNote, ...state.archivedNotes] })),
    deleteArchivedNote: (newNote) =>
        set((state) => ({
            archivedNotes: state.archivedNotes.filter((note) => note._id !== newNote._id),
        })),
    editArchivedNote: (newNote) =>
        set((state) => ({
            archivedNotes: state.archivedNotes.map((note) =>
                note._id === newNote._id ? newNote : note,
            ),
        })),

    // Filtered Notes
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

    // Tags
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
    addTagToNote: (newNote, tag) =>
        set((state) => ({
            notes: state.notes.map((note) => {
                if (note._id === newNote._id) note.tags = [tag, ...note.tags]
                return note
            }),
        })),
    addTagToArchivedNote: (newNote, tag) =>
        set((state) => ({
            archivedNotes: state.archivedNotes.map((note) => {
                if (note._id === newNote._id) note.tags = [...note.tags, tag]
                return note
            }),
        })),
    addTagToBookmarkedNote: (newNote, tag) =>
        set((state) => ({
            bookmarkedNotes: state.bookmarkedNotes.map((note) => {
                if (note._id === newNote._id) note.tags = [...note.tags, tag]
                return note
            }),
        })),
    removeTagFromBookmarkedNote: (newNote, tagId) =>
        set((state) => ({
            bookmarkedNotes: state.bookmarkedNotes.map((note) => {
                if (note._id === newNote._id)
                    note.tags = note.tags.filter((tag) => tag._id !== tagId)
                return note
            }),
        })),
    removeTagFromNote: (newNote, tagId) =>
        set((state) => ({
            notes: state.notes.map((note) => {
                if (note._id === newNote._id)
                    note.tags = note.tags.filter((tag) => tag._id !== tagId)
                return note
            }),
        })),
    removeTagFromArchivedNote: (newNote, tagId) =>
        set((state) => ({
            archivedNotes: state.archivedNotes.map((note) => {
                if (note._id === newNote._id)
                    note.tags = note.tags.filter((tag) => tag._id !== tagId)
                return note
            }),
        })),

    // Tab System
    tabList: [],
    addTab: (newNote) =>
        set((state) => ({
            tabList: state.tabList.find((tab) => tab._id === newNote._id)
                ? state.tabList
                : [newNote, ...state.tabList],
        })),
    removeTab: (newNote) =>
        set((state) => ({
            tabList: state.tabList.filter((note) => note._id !== newNote._id),
        })),

    highlightMode: false,
    setHighlightMode: (mode) => set(() => ({ highlightMode: mode })),
}))

export default useStore
