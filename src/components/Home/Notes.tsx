import { TNote } from '@/types'
import { Masonry } from 'react-plock'
import { useSearchParams } from 'react-router-dom'
import Note from './Note'

type TNotesProps = {
    notes: TNote[] | []
    filteredNotes: TNote[] | []
}

const Notes = ({ notes, filteredNotes }: TNotesProps) => {
    const [searchParams] = useSearchParams({ search: '' })
    const searchTerm = searchParams.get('search') || ''

    return (
        <>
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
                        className='mx-auto mt-10 w-full'
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
                    className='mx-auto mt-10 w-full'
                />
            ) : (
                <p className='mt-10 w-full text-center text-3xl'>Create your First Note</p>
            )}
        </>
    )
}

export default Notes
