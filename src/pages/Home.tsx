import LogoutButton from '@/components/LogoutButton'
import useFetchNotes from '@/hooks/Notes/useFetchNotes'
import useFetchTags from '@/hooks/Tags/useFetchTags'
import useStore from '@/zustand/store'
import { useEffect, type FC } from 'react'
import AddNote from '../components/Home/AddNote'
import Notes from '../components/Home/Notes'
import SelectedNote from '../components/Home/SelectedNote'
import TagDialog from '../components/Home/TagsDialog'
import NavBar from '@/components/NavBar'

const Home: FC = () => {
    const { tagOpen, selectedNoteOpen } = useStore()
    const { getUserNotes } = useFetchNotes()
    const { getUserTags } = useFetchTags()

    useEffect(() => {
        getUserNotes()
        getUserTags()
    }, [])

    return (
        <>
            <NavBar />
            <AddNote />
            <Notes />
            {selectedNoteOpen && <SelectedNote />}
            {tagOpen && <TagDialog />}
            <LogoutButton />
        </>
    )
}
export default Home
