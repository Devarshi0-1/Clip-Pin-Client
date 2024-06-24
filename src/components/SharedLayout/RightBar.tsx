import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import useBatchDeleteNote from '@/hooks/Notes/useDeleteBatchNotes'
import { TNote } from '@/types'
import useStore from '@/zustand/store'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useEffect, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { Button } from '../ui/button'
import Note from './Note'
import SearchBar from './SearchBar'

const RightBar = ({ rightBarOpen }: { rightBarOpen: boolean }) => {
    const { notes, bookmarkedNotes, filteredNotes, archivedNotes, highlightMode } = useStore()
    const [parent] = useAutoAnimate()
    const [parent2] = useAutoAnimate()
    const { pathname } = useLocation()
    const { batchDeleteNotes } = useBatchDeleteNote()
    const [searchParams, _] = useSearchParams()

    const [highlightNotes, setHighlightNotes] = useState<TNote[]>([])

    const handleNoteHighlightNote = (newNote: TNote) => {
        highlightNotes.some((note) => note._id === newNote._id)
            ? setHighlightNotes((prevNotes) => prevNotes.filter((note) => note._id !== newNote._id))
            : setHighlightNotes((prevNotes) => [...prevNotes, newNote])
    }

    const handleBatchDelete = async () => {
        await batchDeleteNotes(highlightNotes)
        setHighlightNotes([])
    }

    useEffect(() => {
        setHighlightNotes([])
    }, [pathname])

    return (
        <Tabs
            defaultValue='notes'
            className={`${rightBarOpen ? 'flex-[2]' : 'w-0 flex-[0]'} h-fit overflow-hidden rounded-md bg-secondary transition-[flex]`}>
            <TabsList className='flex w-full transition-[flex]'>
                <TabsTrigger value='notes' className='flex-1'>
                    {pathname === '/home' ? 'Notes' : 'Archived'}
                </TabsTrigger>
                {!!bookmarkedNotes.length && pathname === '/home' && (
                    <TabsTrigger value='bookmarked' className='flex-1'>
                        Bookmarked
                    </TabsTrigger>
                )}
            </TabsList>
            <TabsContent
                value='notes'
                className='rightSidebar max-h-[500px] overflow-y-auto overflow-x-hidden'
                ref={parent}>
                <SearchBar notesToFilter={pathname === '/home' ? notes : archivedNotes} />
                {(!searchParams.get('search')?.length
                    ? pathname === '/home'
                        ? notes
                        : archivedNotes
                    : filteredNotes
                ).map((note) => (
                    <Note
                        key={note._id}
                        note={note}
                        highlightNotes={highlightNotes}
                        handleNoteHighlightNote={handleNoteHighlightNote}
                    />
                ))}
                {highlightMode && !!highlightNotes.length && (
                    <div className='mt-2 text-center'>
                        <Button
                            onClick={handleBatchDelete}
                            variant='destructive'
                            className='w-full rounded-none'>
                            Delete All
                        </Button>
                    </div>
                )}
            </TabsContent>
            {!!bookmarkedNotes.length && pathname === '/home' && (
                <TabsContent
                    value='bookmarked'
                    className='rightSidebar max-h-[500px] overflow-y-auto overflow-x-hidden'
                    ref={parent2}>
                    <SearchBar notesToFilter={bookmarkedNotes} />
                    {(searchParams.get('search')?.length ? filteredNotes : bookmarkedNotes).map(
                        (note) => (
                            <Note
                                key={note._id}
                                note={note}
                                highlightNotes={highlightNotes}
                                handleNoteHighlightNote={handleNoteHighlightNote}
                            />
                        ),
                    )}
                </TabsContent>
            )}
        </Tabs>
    )
}
export default RightBar
