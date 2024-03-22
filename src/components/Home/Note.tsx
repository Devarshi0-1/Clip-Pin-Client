import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import useDeleteTagFromNote from '@/hooks/Tags/useDeleteTagFromNote'
import { TNote } from '@/types'
import useStore from '@/zustand/store'
import { MouseEvent, type FC } from 'react'
import { RxCross2 } from 'react-icons/rx'

interface TNoteProps {
    note: TNote
}

const Note: FC<TNoteProps> = ({ note }) => {
    const { setSelectedNote, setSelectedNoteOpen } = useStore()
    const { removeTagFromNote } = useDeleteTagFromNote()

    const handleNoteClick = () => {
        setSelectedNote(note)
        setSelectedNoteOpen(true)
    }

    const handleTagDelete = async (
        e: MouseEvent<SVGElement, globalThis.MouseEvent>,
        noteId: string,
        tagId: string,
    ) => {
        e.stopPropagation()
        await removeTagFromNote(noteId, tagId)
    }

    return (
        <Card className='inline-block cursor-pointer bg-secondary' onClick={handleNoteClick}>
            <CardHeader className='pointer-events-none line-clamp-2 max-h-[100px] text-wrap [&::-webkit-scrollbar]:w-[10px]'>
                <CardTitle className='whitespace-pre-wrap text-2xl'>{note.title}</CardTitle>
            </CardHeader>
            <CardContent className='pointer-events-none line-clamp-[11] max-h-[300px] whitespace-pre-wrap text-wrap py-0 [&::-webkit-scrollbar]:w-[10px]'>
                {note.content}
            </CardContent>
            <CardFooter className='space-x-2 p-3 px-6'>
                <div className='flex flex-wrap gap-x-2 gap-y-2'>
                    {note?.tags.map((tag) => (
                        <Badge key={tag._id} className='text-sm'>
                            <p className='max-w-20 overflow-hidden text-ellipsis whitespace-nowrap'>
                                {tag.name}
                            </p>
                            <RxCross2
                                className='ml-2 cursor-pointer text-red-500'
                                onClick={(e) => handleTagDelete(e, note._id, tag._id)}
                            />
                        </Badge>
                    ))}
                </div>
            </CardFooter>
        </Card>
    )
}

export default Note
