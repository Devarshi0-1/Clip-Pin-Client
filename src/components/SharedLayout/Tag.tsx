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
    const { loading: deleteLoading, deleteTag } = useDeleteTag()
    const { loading: editLoading, editTag } = useEditTag()

    const [tagName, setTagName] = useState<string>(tag.name)
    const [editState, setEditState] = useState<boolean>(true)

    const handleTagDelete = async (tagId: string) => {
        await deleteTag(tagId)
    }

    const handleTagEdit = async (tagId: string, tagName: string) => {
        await editTag(tagId, tagName)
    }

    return (
        <div className='flex items-center justify-between rounded-sm bg-card py-1 text-card-foreground shadow-none'>
            <Input
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
                className='border-none focus-visible:ring-0'
                type='text'
                readOnly={editState}
            />
            <div className='flex items-center gap-3'>
                <Button
                    type='submit'
                    variant='destructive'
                    loading={deleteLoading}
                    onClick={() => handleTagDelete(tag._id)}>
                    <MdDeleteOutline />
                </Button>
                {!editState ? (
                    <Button
                        loading={editLoading}
                        onClick={() => {
                            handleTagEdit(tag._id, tagName)
                            setEditState(!editState)
                        }}>
                        Save
                    </Button>
                ) : (
                    <Button onClick={() => setEditState(!editState)}>Edit</Button>
                )}
            </div>
        </div>
    )
}
export default Tag
