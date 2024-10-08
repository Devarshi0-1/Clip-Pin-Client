import { Button } from '@/components/ui/button'
import { Command, CommandGroup, CommandItem } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import useNoteSort from '@/hooks/Notes/useNotesSort'
import { TSort } from '@/types'
import useStore from '@/zustand/store'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { useEffect, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'

interface SortingOption {
    value: TSort
    label: string
}

const sortingTypes: SortingOption[] = [
    {
        value: 'latest',
        label: 'Latest',
    },
    {
        value: 'oldest',
        label: 'Oldest',
    },
    {
        value: 'updated',
        label: 'Last Updated',
    },
]

const Sort = () => {
    const notes = useStore((state) => state.notes)
    const archivedNotes = useStore((state) => state.archivedNotes)
    const bookmarkedNotes = useStore((state) => state.bookmarkedNotes)

    const [open, setOpen] = useState<boolean>(false)
    const [value, setValue] = useState<TSort>('latest')
    const { sortNotes } = useNoteSort()
    const [_, setSearchParams] = useSearchParams({ sort: '' })
    const location = useLocation()

    useEffect(() => {
        if (location.pathname === '/home') {
            sortNotes(notes, 'notes', value)
            sortNotes(bookmarkedNotes, 'bookmarkedNotes', value)
        } else {
            sortNotes(archivedNotes, 'archivedNotes', value)
        }
    }, [notes, archivedNotes, bookmarkedNotes, location])

    useEffect(() => {
        setSearchParams((prev) => {
            prev.set('sort', value)
            return prev
        })
    }, [value])

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant='outline'
                    role='combobox'
                    aria-expanded={open}
                    className='w-fit justify-between'>
                    {value
                        ? sortingTypes.find((sortingType) => sortingType.value === value)?.label
                        : 'Default'}
                    <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
            </PopoverTrigger>
            <PopoverContent className='mt-5 w-[200px] p-0'>
                <Command>
                    <CommandGroup>
                        {sortingTypes.map((sortingType) => (
                            <CommandItem
                                key={sortingType.value}
                                value={sortingType.value}
                                onSelect={(currentValue) => {
                                    setValue(currentValue as TSort)
                                    setOpen(false)
                                }}>
                                {sortingType.label}
                                <CheckIcon
                                    className={`ml-auto h-4 w-4 ${value === sortingType.value ? 'opacity-100' : 'opacity-0'}`}
                                />
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default Sort
