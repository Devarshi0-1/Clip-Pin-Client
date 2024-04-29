import useStore from '@/zustand/store'
import { Search } from 'lucide-react'
import { useEffect } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { Input } from './ui/input'

export default function SearchBar() {
    const { archivedNotes, notes, setFilteredNotes } = useStore()
    const [searchParams, setSearchParams] = useSearchParams({ search: '' })
    const location = useLocation()

    let timerId: NodeJS.Timeout
    useEffect(() => {
        clearTimeout(timerId)
        timerId = setTimeout(() => {
            location.pathname === '/home' &&
                setFilteredNotes(notes, searchParams.get('search') || '')
            location.pathname === '/archived' &&
                setFilteredNotes(archivedNotes, searchParams.get('search') || '')
        }, 700)

        return () => clearTimeout(timerId)
    }, [searchParams.get('search'), location])

    return (
        <div className='relative'>
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
