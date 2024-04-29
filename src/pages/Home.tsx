import AddNote from '@/components/Home/AddNote'
import Notes from '@/components/Home/Notes'
import useStore from '@/zustand/store'

const Home = () => {
    const { notes, filteredNotes } = useStore()

    return (
        <div className='px-20'>
            <AddNote />
            <Notes key='home' notes={notes} filteredNotes={filteredNotes} />
        </div>
    )
}
export default Home
