import { ReactElement } from 'react'

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
}

export type TBasicResponse<T> = {
    success: boolean
    data: T
    message: string
    isError: boolean
    error: {
        message: string
    }
}

export type THeadingOptions = {
    value: 'H1' | 'H2' | 'H3'
    level: 1 | 2 | 3
    icon: ReactElement
}

export type TAlignOptions = {
    value: 'left' | 'center' | 'right' | 'justify'
    icon: ReactElement
}

export type TMode = 'light' | 'dark'

export type TFlavour = 'default' | 'rose' | 'red' | 'green' | 'yellow' | 'violet' | 'blue'

export type TTheme = `${TMode}-${TFlavour}` | 'system'

export type TThemeData = { displayName: string; mode: TFlavour; color: string }

export type TRadius = '0' | '0.3' | '0.5' | '0.75' | '1.0'

export type TSort = 'latest' | 'oldest' | 'updated'

export type TNotes = 'notes' | 'archivedNotes' | 'bookmarkedNotes'
