import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import useAddTagToNote from '@/hooks/Tags/useAddTagToNote'
import useStore from '@/zustand/store'
import { Tag } from 'lucide-react'
import { IoMdAdd } from 'react-icons/io'

const AddTagPopover = () => {
    const { tags: userAllTags, selectedNote } = useStore()

    const { addTagToNote } = useAddTagToNote()

    const handleTagAdd = async (noteId: string, tagId: string) => {
        await addTagToNote(noteId, tagId)
    }

    const exclusiveTags = userAllTags.filter(
        (userTag) => !selectedNote?.tags.find((tag) => tag._id === userTag._id),
    )

    return (
        <Popover>
            <PopoverTrigger asChild>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant='outline'>
                                <Tag className='h-4 w-4' />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Add Tags</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </PopoverTrigger>
            <PopoverContent className='w-fit max-w-80'>
                <div>
                    {exclusiveTags.length ? (
                        exclusiveTags.map((tag) => (
                            <Badge
                                key={tag._id}
                                className='border-none px-2 py-1 '
                                variant='outline'>
                                <p className='max-w-20 overflow-hidden text-ellipsis whitespace-nowrap'>
                                    {tag.name}
                                </p>
                                <Button
                                    size='icon'
                                    variant='ghost'
                                    onClick={() => handleTagAdd(selectedNote?._id!, tag._id)}>
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
