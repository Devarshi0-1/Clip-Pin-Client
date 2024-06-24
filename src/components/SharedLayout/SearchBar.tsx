import { TNote } from '@/types'
import useStore from '@/zustand/store'
import { Search } from 'lucide-react'
import { useEffect } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { Input } from '../ui/input'

export default function SearchBar({ notesToFilter }: { notesToFilter: TNote[] }) {
    const { setFilteredNotes } = useStore()
    const [searchParams, setSearchParams] = useSearchParams({ search: '' })
    const location = useLocation()

    useEffect(() => {
        setFilteredNotes(notesToFilter, searchParams.get('search') || '')
    }, [searchParams.get('search'), location])

    return (
        <div className='relative m-1'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
                type='search'
                placeholder='Search by Text or Tag'
                className='min-w-64 appearance-none bg-background pl-8 shadow-none'
                value={searchParams.get('search') || ''}
                onChange={(e) => {
                    setSearchParams((prev) => {
                        prev.set('search', e.target.value)
                        return prev
                    })
                }}
            />
        </div>
    )
}
