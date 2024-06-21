import { Checkbox } from '@/components/ui/checkbox'
import useArchivedNote from '@/hooks/Notes/useArchiveNote'
import useBookmarkNote from '@/hooks/Notes/useBookmarkNote'
import useNoteDelete from '@/hooks/Notes/useDeleteNote'
import { TNote } from '@/types'
import useStore from '@/zustand/store'
import { Bookmark, Package, PackageOpen, Trash } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/button'

type TNoteProps = {
    note: TNote
    handleNoteHighlightNote: (newNote: TNote) => void
}

const Note = ({ note, handleNoteHighlightNote }: TNoteProps) => {
    const { deleteNote } = useNoteDelete()
    const { archiveNote } = useArchivedNote()
    const { bookmarkNote } = useBookmarkNote()
    const { setSelectedNote, addTab, selectedNote, highlightMode } = useStore()

    const [noteChecked, setNoteChecked] = useState<boolean>(false)

    const handleNoteDelete = async (note: TNote) => {
        await deleteNote(note)
    }

    const handleNoteArchive = async (note: TNote, newArchived: boolean) => {
        await archiveNote(note, newArchived)
    }

    const handleNoteBookmark = async (note: TNote, newArchived: boolean) => {
        await bookmarkNote(note, newArchived)
    }

    const handleNoteClick = (note: TNote) => {
        setSelectedNote(note)
        addTab(note)
    }

    return (
        <div
            key={note._id}
            className={`${selectedNote?._id === note._id ? 'bg-primary/20' : ''} group relative flex cursor-pointer items-center justify-between gap-3 px-3 py-2 text-muted-foreground transition-[background-color] hover:text-primary`}
            onClick={() => handleNoteClick(note)}>
            <div className='flex w-full items-center gap-3 text-left'>
                {highlightMode ? (
                    <Checkbox
                        className='transition-transform ease-in-out hover:scale-150'
                        onClick={(e) => {
                            e.stopPropagation()
                            setNoteChecked(!noteChecked)
                            handleNoteHighlightNote(note)
                        }}
                        checked={noteChecked}
                    />
                ) : (
                    <div
                        className={`${selectedNote?._id === note._id ? 'bg-primary' : 'bg-secondary'} h-2 w-2 rounded-full transition-[background-color] group-hover:bg-primary/40`}></div>
                )}
                <div className='w-full max-w-[calc(100%-2rem)] overflow-hidden text-ellipsis whitespace-nowrap'>
                    {note.title}
                </div>
            </div>
            {!highlightMode && (
                <div className='absolute right-0 flex translate-x-[50%] items-center gap-1 opacity-0 transition-[opacity,transform] ease-in-out group-hover:translate-x-0 group-hover:opacity-100'>
                    <Button
                        onClick={(e) => {
                            e.stopPropagation()
                            handleNoteDelete(note)
                        }}
                        variant='destructive'
                        size='sm'
                        className='m-0 aspect-square rounded-full p-0 opacity-40 transition-opacity hover:opacity-100'>
                        <Trash className='h-5 w-5' />
                    </Button>
                    {!note.isBookmarked && (
                        <Button
                            onClick={(e) => {
                                e.stopPropagation()
                                handleNoteArchive(note, !note.isArchived)
                            }}
                            variant='outline'
                            size='sm'
                            className='m-0 aspect-square rounded-full p-0 opacity-40 transition-opacity hover:opacity-100'>
                            {note.isArchived ? (
                                <PackageOpen className='h-5 w-5' />
                            ) : (
                                <Package className='h-5 w-5' />
                            )}
                        </Button>
                    )}
                    <Button
                        variant='outline'
                        className='m-0 aspect-square rounded-full p-0 opacity-40 transition-opacity hover:opacity-100'>
                        <Bookmark
                            className={`h-5 w-5 ${note.isBookmarked ? 'fill-foreground' : ''}`}
                            onClick={(e) => {
                                e.stopPropagation()
                                handleNoteBookmark(note, !note.isBookmarked)
                            }}
                        />
                    </Button>
                </div>
            )}
        </div>
    )
}
export default Note
