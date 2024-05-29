import useAddNote from '@/hooks/Notes/useAddNote'
import useNoteEdit from '@/hooks/Notes/useEditNote'
import useStore from '@/zustand/store'
import { useCurrentEditor } from '@tiptap/react'
import {
    Bold,
    Check,
    Clipboard,
    Heading1,
    Heading2,
    Heading3,
    Italic,
    List,
    ListOrdered,
    Minus,
    Pilcrow,
    Quote,
    Redo,
    Strikethrough,
    Undo,
    WrapText,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import AddTagPopover from '../SharedLayout/AddTagPopover'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

const MenuBar = () => {
    const { editor } = useCurrentEditor()
    const { selectedNote } = useStore()
    const { addNote } = useAddNote()
    const { editNote } = useNoteEdit()

    const [title, setTitle] = useState<string>('')
    const [textCopied, setTextCopied] = useState<boolean>(false)

    if (!editor) {
        return null
    }

    const handleAddNoteSubmit = async () => {
        if (!title || editor.isEmpty) return

        await addNote(title, editor.getHTML())

        setTitle('')
        editor.commands.setContent('')
    }

    const handleNoteEdit = async () => {
        if (!selectedNote) return

        if (!title || editor.isEmpty) return

        await editNote(selectedNote, title, editor.getHTML())
    }

    // const handleNotePaste = (e: ClipboardEvent<HTMLDivElement>) => {
    //     e.preventDefault()
    //     const text = e.clipboardData.getData('text/plain')
    //     document.execCommand('insertHTML', false, text)
    // }

    const handleNoteCopy = () => {
        const text = `${selectedNote?.title}\n${editor.getText()}`
        navigator.clipboard.writeText(text)
        toast.success('Note Text Copied')
        setTextCopied(true)
    }

    useEffect(() => {
        if (!selectedNote) {
            setTitle('')
            editor.commands.setContent('')
            return
        }

        editor.commands.setContent(selectedNote.content)
        setTitle(selectedNote.title)
    }, [selectedNote?._id])

    return (
        <div className='flex flex-col gap-5'>
            <div className='flex justify-between'>
                <div className='flex gap-3'>
                    <Button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        disabled={!editor.can().chain().focus().toggleBold().run()}
                        variant={editor.isActive('bold') ? 'default' : 'outline'}>
                        <Bold className='h-4 w-4' />
                    </Button>
                    <Button
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        disabled={!editor.can().chain().focus().toggleItalic().run()}
                        variant={editor.isActive('italic') ? 'default' : 'outline'}>
                        <Italic className='h-4 w-4' />
                    </Button>
                    <Button
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        disabled={!editor.can().chain().focus().toggleStrike().run()}
                        variant={editor.isActive('strike') ? 'default' : 'outline'}>
                        <Strikethrough className='h-4 w-4' />
                    </Button>
                    <Button
                        onClick={() => editor.chain().focus().setParagraph().run()}
                        variant={editor.isActive('paragraph') ? 'default' : 'outline'}>
                        <Pilcrow className='h-4 w-4' />
                    </Button>
                    <Button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        variant={editor.isActive('heading', { level: 1 }) ? 'default' : 'outline'}>
                        <Heading1 className='h-4 w-4' />
                    </Button>
                    <Button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        variant={editor.isActive('heading', { level: 2 }) ? 'default' : 'outline'}>
                        <Heading2 className='h-4 w-4' />
                    </Button>
                    <Button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        variant={editor.isActive('heading', { level: 3 }) ? 'default' : 'outline'}>
                        <Heading3 className='h-4 w-4' />
                    </Button>
                    <Button
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        variant={editor.isActive('bulletList') ? 'default' : 'outline'}>
                        <List className='h-4 w-4' />
                    </Button>
                    <Button
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        variant={editor.isActive('orderedList') ? 'default' : 'outline'}>
                        <ListOrdered className='h-4 w-4' />
                    </Button>
                    <Button
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        variant={editor.isActive('blockquote') ? 'default' : 'outline'}>
                        <Quote className='h-4 w-4' />
                    </Button>
                    <Button
                        onClick={() => editor.chain().focus().setHorizontalRule().run()}
                        variant='secondary'>
                        <Minus className='h-4 w-4' />
                    </Button>
                    <Button
                        onClick={() => editor.chain().focus().setHardBreak().run()}
                        variant='secondary'>
                        <WrapText className='h-4 w-4' />
                    </Button>
                    <Button
                        onClick={() => editor.chain().focus().undo().run()}
                        disabled={!editor.can().chain().focus().undo().run()}>
                        <Undo className='h-4 w-4' />
                    </Button>
                    <Button
                        onClick={() => editor.chain().focus().redo().run()}
                        disabled={!editor.can().chain().focus().redo().run()}>
                        <Redo className='h-4 w-4' />
                    </Button>
                </div>
                <div className='flex items-center gap-4'>
                    {selectedNote ? (
                        <Button onClick={handleNoteEdit}>Save</Button>
                    ) : (
                        <Button onClick={handleAddNoteSubmit}>Create Note</Button>
                    )}
                    {selectedNote && (
                        <>
                            <AddTagPopover />
                            <Button variant='outline' onClick={handleNoteCopy}>
                                {textCopied ? (
                                    <Check className='h-4 w-4' />
                                ) : (
                                    <Clipboard className='h-4 w-4' />
                                )}
                            </Button>
                        </>
                    )}
                </div>
            </div>
            <div className='mb-1'>
                <Input
                    placeholder='Title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='h-auto p-3 text-3xl font-bold'
                />
            </div>
        </div>
    )
}
export default MenuBar
