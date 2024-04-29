import Notes from '@/components/Home/Notes'
import useStore from '@/zustand/store'

const Archived = () => {
    const { archivedNotes, filteredNotes } = useStore()

    return (
        <div className='px-20'>
            <Notes key='archived' notes={archivedNotes} filteredNotes={filteredNotes} />
        </div>
    )
}
export default Archived
