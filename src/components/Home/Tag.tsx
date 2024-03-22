import useDeleteTag from '@/hooks/Tags/useDeleteTag'
import useEditTag from '@/hooks/Tags/useEditTag'
import { TTag } from '@/types'
import { useState } from 'react'
import { MdDeleteOutline } from 'react-icons/md'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

interface Props {
    tag: TTag
}

const Tag = ({ tag }: Props) => {
    const { deleteTag } = useDeleteTag()
    const { editTag } = useEditTag()
    const [tagName, setTagName] = useState<string>(tag.name)

    const handleTagDelete = async (tagId: string) => {
        await deleteTag(tagId)
    }

    const handleTagEdit = async (tagId: string, tagName: string) => {
        await editTag(tagId, tagName)
    }

    return (
        <div className='flex items-center justify-between bg-card px-3 text-card-foreground shadow'>
            <Input
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
                className='border-none'
                type='text'
            />
            <div className='flex items-center gap-3'>
                <Button
                    variant='destructive'
                    type='submit'
                    onClick={() => handleTagDelete(tag._id)}>
                    <MdDeleteOutline />
                </Button>
                {tag.name !== tagName && (
                    <Button onClick={() => handleTagEdit(tag._id, tagName)}>Edit</Button>
                )}
            </div>
        </div>
    )
}
export default Tag
