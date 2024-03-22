import useStore from '@/zustand/store'
import { useEffect } from 'react'
import { CiSearch } from 'react-icons/ci'
import { Input } from './ui/input'

export default function SearchBar() {
    const { setFilteredNotes, searchTerm, setSearchTerm } = useStore()

    let timerId: NodeJS.Timeout
    useEffect(() => {
        clearTimeout(timerId)
        timerId = setTimeout(() => {
            setFilteredNotes()
        }, 800)

        return () => clearTimeout(timerId)
    }, [searchTerm])

    return (
        <div className='ml-auto flex w-fit items-center gap-2 rounded-full border focus-within:border-white focus-within:outline-2 focus:border-2 focus:border-white'>
            <CiSearch className='ml-2 text-2xl' />
            <Input
                type='search'
                placeholder='Search...'
                className='flex-1 border-0 border-none py-0 text-sm shadow-none focus-visible:ring-0'
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    )
}
