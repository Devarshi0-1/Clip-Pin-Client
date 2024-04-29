import useFetchNotes from '@/hooks/Notes/useFetchNotes'
import useFetchTags from '@/hooks/Tags/useFetchTags'
import useStore from '@/zustand/store'
import { useEffect } from 'react'
import SelectedNote from './Home/SelectedNote'
import { Sidebar } from './Home/Sidebar'
import TagsDialog from './Home/TagsDialog'
import NavBar from './NavBar'

type SharedComponentsProps = {
    children: JSX.Element
}

const SharedComponents = ({ children }: SharedComponentsProps) => {
    const { getUserNotes } = useFetchNotes()
    const { getUserTags } = useFetchTags()
    const { tagOpen, selectedNoteOpen } = useStore()

    useEffect(() => {
        getUserNotes()
        getUserTags()
    }, [])

    return (
        <>
            <NavBar />
            <Sidebar />
            {children}
            {selectedNoteOpen && <SelectedNote />}
            {tagOpen && <TagsDialog />}
        </>
    )
}
export default SharedComponents
