import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'
import { Command, CommandGroup, CommandItem } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import useNoteSort from '@/hooks/useNotesSort'
import { TSort } from '@/types'
import useStore from '@/zustand/store'
import { useEffect, useState } from 'react'

interface SortingOption {
    value: TSort
    label: string
}

const sortingTypes: SortingOption[] = [
    {
        value: 'latest',
        label: 'Default',
    },
    {
        value: 'oldest',
        label: 'Ascending',
    },
    {
        value: 'updated',
        label: 'Last Updated',
    },
]

const Sort = () => {
    const [open, setOpen] = useState<boolean>(false)
    const [value, setValue] = useState<string>('latest')
    const { notes } = useStore()
    const { sortNotes } = useNoteSort()

    useEffect(() => {
        if (value !== 'latest' && value !== 'oldest' && value !== 'updated') return
        sortNotes(value)
    }, [notes, value])

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
            <PopoverContent className='w-[200px] p-0'>
                <Command>
                    <CommandGroup>
                        {sortingTypes.map((sortingType) => (
                            <CommandItem
                                key={sortingType.value}
                                value={sortingType.value}
                                onSelect={(currentValue) => {
                                    setValue(currentValue)
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
