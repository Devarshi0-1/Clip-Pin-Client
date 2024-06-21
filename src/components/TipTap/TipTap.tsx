import { Badge } from '@/components/ui/badge'
import useDeleteTagFromNote from '@/hooks/Tags/useDeleteTagFromNote'
import { formatDate } from '@/utils/formatter'
import useStore from '@/zustand/store'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle, { TextStyleOptions } from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import { EditorProvider } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { RxCross2 } from 'react-icons/rx'
import MenuBar from './MenuBar'
import './styles.css'

const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] } as Partial<TextStyleOptions>),
    StarterKit.configure({
        bulletList: {
            keepMarks: true,
            keepAttributes: false,
        },
        orderedList: {
            keepMarks: true,
            keepAttributes: false,
        },
    }),
    Placeholder.configure({
        placeholder: 'Write Something...',
    }),
    Underline,
    TextAlign.configure({
        types: ['heading', 'paragraph', 'bulletList', 'orderedList'],
    }),
]

const TipTap = () => {
    const { selectedNote } = useStore()
    const { removeTagFromNote } = useDeleteTagFromNote()
    const [parent] = useAutoAnimate()

    const handleTagDelete = async (tagId: string) => {
        if (!selectedNote) return
        await removeTagFromNote(selectedNote, tagId)
    }

    return (
        <div className='relative rounded-sm border'>
            <EditorProvider slotBefore={<MenuBar />} extensions={extensions} content={''}>
                {!!selectedNote?.tags.length && (
                    <div ref={parent} className='mt-4 flex flex-wrap gap-3 px-3 py-2'>
                        {selectedNote?.tags.map((tag) => (
                            <Badge key={tag._id} variant='default' className='text-md'>
                                <p className='max-w-28 overflow-hidden text-ellipsis whitespace-nowrap'>
                                    {tag.name}
                                </p>
                                <RxCross2
                                    className='ml-2 cursor-pointer text-red-500'
                                    onClick={() => handleTagDelete(tag._id)}
                                />
                            </Badge>
                        ))}
                    </div>
                )}
            </EditorProvider>
            <div className='absolute bottom-0 right-3 translate-y-1/2 space-x-3'>
                <span className='bg-background px-2 py-1'>
                    <span className='text-primary/50'>Edited:</span>{' '}
                    <span className='text-foreground/50'>{formatDate(selectedNote?.updatedAt)}</span>
                </span>
                <span className='bg-background px-2 py-1'>
                    <span className='text-primary/50'>Created:</span>{' '}
                    <span className='text-foreground/50'>{formatDate(selectedNote?.createdAt)}</span>
                </span>
            </div>
        </div>
    )
}

export default TipTap
