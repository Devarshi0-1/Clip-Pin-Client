export type TUser = {
    _id: string
    fullName: string
    username: string
    password: string
    createdAt: Date
    updatedAt: Date
}

export type TTag = {
    _id: string
    owner: string
    name: string
    createdAt: Date
    updatedAt: Date
}

export type TNote = {
    _id: string
    owner: string
    title: string
    tags: TTag[] | []
    content: string
    isBookmarked: boolean
    isArchived: boolean
    createdAt: Date
    updatedAt: Date
} /*& { isActive: boolean; isHighlighted: boolean } */

export type TBasicResponse<T> = {
    success: boolean
    data: T
    message: string
    isError: boolean
    error: {
        message: string
    }
}

export type TSort = 'latest' | 'oldest' | 'updated'

export type TNotes = 'notes' | 'archivedNotes' | 'bookmarkedNotes'
