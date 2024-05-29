import { Badge } from '@/components/ui/badge'
import useDeleteTagFromNote from '@/hooks/Tags/useDeleteTagFromNote'
import useStore from '@/zustand/store'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import Placeholder from '@tiptap/extension-placeholder'
import TextStyle from '@tiptap/extension-text-style'
import { BubbleMenu, EditorProvider } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { RxCross2 } from 'react-icons/rx'
import MenuBar from './MenuBar'
import './styles.css'

const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    // @ts-ignore
    TextStyle.configure({ types: [ListItem.name] }),
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
        <div className=''>
            <EditorProvider slotBefore={<MenuBar />} extensions={extensions} content={''}>
                <BubbleMenu>{''}</BubbleMenu>
            </EditorProvider>
            {!!selectedNote?.tags.length && (
                <div ref={parent} className='flex flex-wrap gap-3 mt-4'>
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
        </div>
    )
}

export default TipTap
