import TipTap from '@/components/TipTap/TipTap'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import useBatchDeleteNote from '@/hooks/Notes/useDeleteBatchNotes'
import { TNote } from '@/types'
import useStore from '@/zustand/store'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { ChevronsLeft } from 'lucide-react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Button } from '../ui/button'
import Note from './Note'
import TabList from './TabList'

const MainContent = () => {
    const { setSidebarOpen, notes, bookmarkedNotes, filteredNotes, archivedNotes, highlightMode } =
        useStore()
    const [parent] = useAutoAnimate()
    const [parent2] = useAutoAnimate()
    const { pathname } = useLocation()
    const { batchDeleteNotes } = useBatchDeleteNote()
    const [highlightNotes, setHighlightNotes] = useState<TNote[]>([])

    const [rightBarOpen, setRightBarOpen] = useState<boolean>(false)

    const handleNoteHighlightNote = (newNote: TNote) => {
        if (highlightNotes.includes(newNote)) {
            setHighlightNotes((prevNotes) => prevNotes.filter((note) => note._id !== newNote._id))
        } else {
            setHighlightNotes((prevNotes) => [...prevNotes, newNote])
        }
    }

    const handleBatchDelete = async () => {
        await batchDeleteNotes(highlightNotes)
    }

    return (
        <main onClick={() => setSidebarOpen(false)} className='relative mx-auto flex w-[95%] gap-3'>
            <div className='flex flex-[8] flex-col gap-4 overflow-hidden'>
                <TabList />
                <TipTap />
            </div>
            <div
                onClick={() => setRightBarOpen(!rightBarOpen)}
                className='fixed -right-5 top-1/2 aspect-square cursor-pointer rounded-full bg-secondary p-2 transition-[right] hover:right-0'>
                <ChevronsLeft
                    className={`${rightBarOpen ? 'rotate-180' : ''} transition-transform`}
                />
            </div>
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
                    {(!filteredNotes.length
                        ? pathname === '/home'
                            ? notes
                            : archivedNotes
                        : filteredNotes
                    ).map((note) => (
                        <Note
                            key={note._id}
                            note={note}
                            handleNoteHighlightNote={handleNoteHighlightNote}
                        />
                    ))}
                    {highlightMode && !!highlightNotes.length && (
                        <div className='mt-2 text-center'>
                            <Button
                                onClick={handleBatchDelete}
                                variant='destructive'
                                className='w-full'>
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
                        {bookmarkedNotes.map((note) => (
                            <Note
                                key={note._id}
                                note={note}
                                handleNoteHighlightNote={handleNoteHighlightNote}
                            />
                        ))}
                    </TabsContent>
                )}
            </Tabs>
        </main>
    )
}
export default MainContent
