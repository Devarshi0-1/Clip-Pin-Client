import TipTap from '@/components/TipTap/TipTap'
import useStore from '@/zustand/store'
import { ChevronsLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import RightBar from './RightBar'
import TabList from './TabList'

const MainContent = () => {
    const { notes, setSidebarOpen, addTab, selectedNote, setSelectedNote } = useStore()
    const [rightBarOpen, setRightBarOpen] = useState<boolean>(true)
    const [selectedNoteParams, setSelectedNoteParams] = useSearchParams({ 'selected-note': '' })

    useEffect(() => {
        const noteFound = notes.find((note) => note._id === selectedNoteParams.get('selected-note'))

        if (!noteFound) return
        setSelectedNote(noteFound)
        addTab(noteFound)
    }, [selectedNoteParams.get('selected-note'), notes])

    useEffect(() => {
        if (selectedNote?._id)
            setSelectedNoteParams((prev) => {
                prev.set('selected-note', selectedNote?._id)
                return prev
            })
    }, [selectedNote?._id])

    return (
        <main onClick={() => setSidebarOpen(false)} className='relative mx-auto flex w-[95%] gap-3'>
            <div className='flex flex-[8] flex-col gap-4'>
                <TabList />
                <TipTap />
            </div>
            <div
                onClick={() => setRightBarOpen(!rightBarOpen)}
                className='fixed -right-5 top-1/2 aspect-square translate-y-[-50%] cursor-pointer rounded-full bg-secondary p-2 transition-[right] hover:right-0'>
                <ChevronsLeft
                    className={`${rightBarOpen ? 'rotate-180' : ''} transition-transform`}
                />
            </div>
            <RightBar rightBarOpen={rightBarOpen} />
        </main>
    )
}
export default MainContent
