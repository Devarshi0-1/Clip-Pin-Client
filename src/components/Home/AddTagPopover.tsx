import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import useAddTagToNote from '@/hooks/Tags/useAddTagToNote'
import useStore from '@/zustand/store'
import { IoMdAdd } from 'react-icons/io'
import { IoPricetagOutline } from 'react-icons/io5'

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
                <Button variant='ghost'>
                    <IoPricetagOutline className='text-xl' />
                </Button>
            </PopoverTrigger>
            <PopoverContent className='max-w-80 w-fit'>
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
