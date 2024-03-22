import useStore from '@/zustand/store'
import type { FC } from 'react'
import { Masonry } from 'react-plock'
import SearchBar from '../SearchBar'
import Note from './Note'
import Sort from './Sort'

const Notes: FC = () => {
    const { notes, filteredNotes, searchTerm } = useStore()

    return (
        <>
            <div className='flex gap-3 px-16'>
                <SearchBar />
                <Sort />
            </div>
            {searchTerm.length ? (
                filteredNotes.length ? (
                    <Masonry
                        items={filteredNotes}
                        config={{
                            columns: [1, 2, 3],
                            gap: [24, 12, 30],
                            media: [640, 768, 1024],
                        }}
                        render={(note) => <Note key={note._id} note={note} />}
                        className='mx-auto mt-10 w-full px-20'
                    />
                ) : (
                    <p className='mt-10 w-full text-center text-3xl'>No Notes Found!</p>
                )
            ) : notes.length ? (
                <Masonry
                    items={notes}
                    config={{
                        columns: [1, 2, 3],
                        gap: [24, 12, 30],
                        media: [640, 768, 1024],
                    }}
                    render={(note) => <Note key={note._id} note={note} />}
                    className='mx-auto mt-10 w-full px-20'
                />
            ) : (
                <p className='mt-10 w-full text-center text-3xl'>Create your First Note</p>
            )}
        </>
    )
}

export default Notes
