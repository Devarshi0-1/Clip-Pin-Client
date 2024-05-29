import useFetchNotes from '@/hooks/Notes/useFetchNotes'
import useFetchTags from '@/hooks/Tags/useFetchTags'
import { useEffect } from 'react'
import LogoutButton from './LogoutButton'
import MainContent from './MainContent'
import NavBar from './NavBar'
import { Sidebar } from './Sidebar'
import TagsDialog from './TagsDialog'

const SharedComponents = () => {
    const { getUserNotes } = useFetchNotes()
    const { getUserTags } = useFetchTags()

    useEffect(() => {
        getUserNotes()
        getUserTags()
    }, [])

    return (
        <>
            <NavBar />
            <Sidebar />
            <MainContent />
            <LogoutButton />
            <TagsDialog />
        </>
    )
}
export default SharedComponents
