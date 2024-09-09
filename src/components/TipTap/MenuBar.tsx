import useAddNote from '@/hooks/Notes/useAddNote'
import useNoteEdit from '@/hooks/Notes/useEditNote'
import { TAlignOptions, THeadingOptions } from '@/types'
import useStore from '@/zustand/store'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { useCurrentEditor } from '@tiptap/react'
import {
    AlignCenter,
    AlignJustify,
    AlignLeft,
    AlignRight,
    Bold,
    Check,
    Clipboard,
    Heading,
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
    Underline,
    Undo,
    WrapText,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import AddTagPopover from '../SharedLayout/AddTagPopover'
import { Button } from '../ui/button'
import { Command, CommandGroup, CommandItem } from '../ui/command'
import { Input } from '../ui/input'
import { Popover, PopoverContent } from '../ui/popover'

const MenuBar = () => {
    const { editor } = useCurrentEditor()
    const { selectedNote } = useStore()
    const { loading: addNoteLoading, addNote } = useAddNote()
    const { loading: editNoteLoading, editNote } = useNoteEdit()

    const [title, setTitle] = useState<string>('')
    const [textCopied, setTextCopied] = useState<boolean>(false)

    if (!editor) {
        return null
    }

    const headings: THeadingOptions[] = [
        {
            value: 'H1',
            level: 1,
            icon: <Heading1 className='h-5 w-5' />,
        },
        {
            value: 'H2',
            level: 2,
            icon: <Heading2 className='h-5 w-5' />,
        },
        {
            value: 'H3',
            level: 3,
            icon: <Heading3 className='h-5 w-5' />,
        },
    ] as const

    const alignments: TAlignOptions[] = [
        {
            value: 'left',
            icon: <AlignLeft className='h-5 w-5' />,
        },
        {
            value: 'center',
            icon: <AlignCenter className='h-5 w-5' />,
        },
        {
            value: 'right',
            icon: <AlignRight className='h-5 w-5' />,
        },
        {
            value: 'justify',
            icon: <AlignJustify className='h-5 w-5' />,
        },
    ] as const

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
        <div className='flex flex-col'>
            <div className='flex justify-between border-b p-2'>
                <div className='flex gap-3'>
                    <Button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        disabled={!editor.can().chain().focus().toggleBold().run()}
                        variant={editor.isActive('bold') ? 'secondary' : 'ghost'}>
                        <Bold className='h-5 w-5' />
                    </Button>
                    <Button
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        disabled={!editor.can().chain().focus().toggleItalic().run()}
                        variant={editor.isActive('italic') ? 'secondary' : 'ghost'}>
                        <Italic className='h-5 w-5' />
                    </Button>
                    <Button
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        disabled={!editor.can().chain().focus().toggleStrike().run()}
                        variant={editor.isActive('strike') ? 'secondary' : 'ghost'}>
                        <Strikethrough className='h-5 w-5' />
                    </Button>
                    <Button
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        disabled={!editor.can().chain().focus().toggleUnderline().run()}
                        variant={editor.isActive('underline') ? 'secondary' : 'ghost'}>
                        <Underline className='h-5 w-5' />
                    </Button>
                    <Button
                        onClick={() => editor.chain().focus().setParagraph().run()}
                        variant={editor.isActive('paragraph') ? 'secondary' : 'ghost'}>
                        <Pilcrow className='h-5 w-5' />
                    </Button>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={`${editor.isActive('heading') ? 'secondary' : 'ghost'}`}
                                role='combobox'
                                aria-expanded={true}
                                className='w-fit justify-between'>
                                {editor.isActive('heading') ? (
                                    headings.find((heading) =>
                                        editor.isActive('heading', {
                                            level: heading.level,
                                        }),
                                    )?.icon
                                ) : (
                                    <Heading className='h-5 w-5' />
                                )}
                                <CaretSortIcon className='ml-2 h-4 w-4 opacity-50' />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className='mt-5 w-fit p-0'>
                            <Command>
                                <CommandGroup>
                                    {headings.map((heading) => (
                                        <CommandItem key={heading.level}>
                                            <Button
                                                onClick={() => {
                                                    editor
                                                        .chain()
                                                        .focus()
                                                        .toggleHeading({ level: heading.level })
                                                        .run()
                                                }}
                                                variant={
                                                    editor.isActive('heading', {
                                                        level: heading.level,
                                                    })
                                                        ? 'secondary'
                                                        : 'ghost'
                                                }>
                                                {heading.icon}
                                            </Button>
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={`${
                                    alignments.find((alignment) =>
                                        editor.isActive({ textAlign: alignment.value }),
                                    )
                                        ? 'secondary'
                                        : 'ghost'
                                }`}
                                role='combobox'
                                aria-expanded={true}
                                className='w-fit justify-between'>
                                {alignments.find((alignment) =>
                                    editor.isActive({ textAlign: alignment.value }),
                                ) ? (
                                    alignments.find((alignment) =>
                                        editor.isActive({ textAlign: alignment.value }),
                                    )?.icon
                                ) : (
                                    <AlignLeft className='h-5 w-5' />
                                )}
                                <CaretSortIcon className='ml-2 h-4 w-4 opacity-50' />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className='mt-5 w-fit p-0'>
                            <Command>
                                <CommandGroup>
                                    {alignments.map((alignment) => (
                                        <CommandItem key={alignment.value}>
                                            <Button
                                                onClick={() =>
                                                    editor
                                                        .chain()
                                                        .focus()
                                                        .setTextAlign(alignment.value)
                                                        .run()
                                                }
                                                variant={
                                                    editor.isActive({ textAlign: alignment.value })
                                                        ? 'secondary'
                                                        : 'ghost'
                                                }>
                                                {alignment.icon}
                                            </Button>
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>

                    <Button
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        variant={editor.isActive('bulletList') ? 'secondary' : 'ghost'}>
                        <List className='h-5 w-5' />
                    </Button>
                    <Button
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        variant={editor.isActive('orderedList') ? 'secondary' : 'ghost'}>
                        <ListOrdered className='h-5 w-5' />
                    </Button>
                    <Button
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        variant={editor.isActive('blockquote') ? 'secondary' : 'ghost'}>
                        <Quote className='h-5 w-5' />
                    </Button>
                    <Button
                        onClick={() => editor.chain().focus().setHorizontalRule().run()}
                        variant='ghost'>
                        <Minus className='h-5 w-5' />
                    </Button>
                    <Button
                        onClick={() => editor.chain().focus().setHardBreak().run()}
                        variant='ghost'>
                        <WrapText className='h-5 w-5' />
                    </Button>
                    <Button
                        onClick={() => editor.chain().focus().undo().run()}
                        disabled={!editor.can().chain().focus().undo().run()}
                        variant='outline'>
                        <Undo className='h-5 w-5' />
                    </Button>
                    <Button
                        onClick={() => editor.chain().focus().redo().run()}
                        disabled={!editor.can().chain().focus().redo().run()}
                        variant='outline'>
                        <Redo className='h-5 w-5' />
                    </Button>
                </div>
                <div className='flex items-center gap-4'>
                    {selectedNote ? (
                        <Button onClick={handleNoteEdit} loading={editNoteLoading}>
                            Save
                        </Button>
                    ) : (
                        <Button onClick={handleAddNoteSubmit} loading={addNoteLoading}>
                            Create Note
                        </Button>
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
            <div className='mt-3'>
                <Input
                    placeholder='Title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='h-auto border-none p-3 text-3xl font-bold focus-visible:ring-0'
                />
            </div>
            <div className='mx-auto my-2 h-[1px] w-1/2 bg-secondary' />
        </div>
    )
}
export default MenuBar
