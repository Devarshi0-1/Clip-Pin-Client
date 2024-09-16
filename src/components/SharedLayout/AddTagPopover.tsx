import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import useAddTagToNote from '@/hooks/Tags/useAddTagToNote'
import { TNote } from '@/types'
import useStore from '@/zustand/store'
import { Tag } from 'lucide-react'
import { IoMdAdd } from 'react-icons/io'

const AddTagPopover = () => {
    const userAllTags = useStore((state) => state.tags)
    const selectedNote = useStore((state) => state.selectedNote)

    const { loading, addTagToNote } = useAddTagToNote()

    const handleTagAdd = async (note: TNote, tagId: string) => {
        await addTagToNote(note, tagId)
    }

    const exclusiveTags = userAllTags.filter(
        (userTag) => !selectedNote?.tags.find((tag) => tag._id === userTag._id),
    )

    if (!selectedNote) return
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant='outline'>
                    <Tag className='h-4 w-4' />
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-fit max-w-80'>
                <div>
                    {exclusiveTags.length ? (
                        exclusiveTags.map((tag) => (
                            <Badge
                                key={tag._id}
                                className='border-none px-2 py-1'
                                variant='outline'>
                                <p className='max-w-20 overflow-hidden text-ellipsis whitespace-nowrap'>
                                    {tag.name}
                                </p>
                                <Button
                                    size='icon'
                                    variant='ghost'
                                    loading={loading}
                                    onClick={() => handleTagAdd(selectedNote, tag._id)}>
                                    <IoMdAdd />
                                </Button>
                            </Badge>
                        ))
                    ) : (
                        <p className='text-center'>No Tags to Add!</p>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    )
}
export default AddTagPopover
