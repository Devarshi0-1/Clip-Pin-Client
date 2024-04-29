import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import useArchivedNote from '@/hooks/Notes/useArchivedNote'
import useNoteDelete from '@/hooks/Notes/useDeleteNote'
import useNoteEdit from '@/hooks/Notes/useEditNote'
import useDeleteTagFromNote from '@/hooks/Tags/useDeleteTagFromNote'
import useStore from '@/zustand/store'
import { ArchiveRestore, Check, Clipboard, PackageOpen } from 'lucide-react'
import type { ClipboardEvent, FC } from 'react'
import { useEffect, useRef, useState } from 'react'
import { MdDeleteOutline } from 'react-icons/md'
import { RxCross2 } from 'react-icons/rx'
import { toast } from 'sonner'
import AddTagPopover from './AddTagPopover'

const SelectedNote: FC = () => {
    const { selectedNote, selectedNoteOpen, setSelectedNoteOpen } = useStore()
    const { deleteNote } = useNoteDelete()
    const { editNote } = useNoteEdit()
    const { archiveNote } = useArchivedNote()
    const { removeTagFromNote } = useDeleteTagFromNote()

    const [textCopied, setTextCopied] = useState<boolean>(false)

    const titleRef = useRef<HTMLPreElement>(null)
    const contentRef = useRef<HTMLPreElement>(null)

    const handleNoteDelete = async () => {
        if (!selectedNote) return
        await deleteNote(selectedNote?._id)
    }

    const handleNoteEdit = async () => {
        if (!selectedNote) return

        if (!titleRef.current || !contentRef.current) return

        if (
            titleRef.current.innerText === selectedNote.title &&
            contentRef.current.innerText === selectedNote.content
        )
            return

        await editNote(selectedNote._id, titleRef.current.innerText, contentRef.current.innerText)
    }

    const handleArchived = async (newArchived: boolean) => {
        if (!selectedNote) return
        await archiveNote(selectedNote._id, newArchived)
    }

    const handleNotePaste = (e: ClipboardEvent<HTMLPreElement>) => {
        e.preventDefault()
        const text = e.clipboardData.getData('text/plain')
        document.execCommand('insertHTML', false, text)
    }

    const handleNoteCopy = () => {
        const text = `${selectedNote?.title}\n${selectedNote?.content}`
        navigator.clipboard.writeText(text)
        toast.success('Note Text Copied')
        setTextCopied(true)
    }

    const handleTagDelete = async (tagId: string) => {
        if (!selectedNote) return
        await removeTagFromNote(selectedNote?._id, tagId)
    }

    useEffect(() => {
        if (!selectedNote) return

        if (!titleRef.current || !contentRef.current) return

        titleRef.current.innerText = selectedNote.title
        contentRef.current.innerText = selectedNote.content
    }, [selectedNote?.title, selectedNote?.content, selectedNoteOpen])

    return (
        <Dialog open={selectedNoteOpen} onOpenChange={setSelectedNoteOpen}>
            <DialogContent className='flex-8 flex h-fit max-h-[80%] min-w-[50%] flex-col'>
                <Card className='h-full overflow-y-auto border-none shadow-none'>
                    <CardHeader>
                        <CardTitle>
                            <pre
                                tabIndex={0}
                                ref={titleRef}
                                data-text='Title'
                                contentEditable={true}
                                onPaste={handleNotePaste}
                                className='w-full whitespace-pre text-wrap font-[inherit] text-3xl outline-none'
                            />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <pre
                            tabIndex={0}
                            ref={contentRef}
                            data-text='Take a note'
                            contentEditable={true}
                            onPaste={handleNotePaste}
                            className='mb-5 w-full whitespace-pre text-wrap font-[inherit] text-xl outline-none'
                        />
                        <div className='flex flex-wrap gap-x-2 gap-y-2'>
                            {selectedNote?.tags.map((tag) => (
                                <Badge key={tag._id} variant='secondary' className='text-md'>
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
                    </CardContent>
                </Card>
                <div className='flex flex-1 justify-between'>
                    <div className='flex items-center gap-2'>
                        <AddTagPopover />
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant='outline' onClick={handleNoteCopy}>
                                        {textCopied ? (
                                            <Check className='h-4 w-4' />
                                        ) : (
                                            <Clipboard className='h-4 w-4' />
                                        )}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Smart Copy</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        {selectedNote?.isArchived ? (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant='outline'
                                            onClick={() => handleArchived(false)}>
                                            <ArchiveRestore className='h-4 w-4' />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Unarchive Note</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        ) : (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant='outline'
                                            onClick={() => handleArchived(true)}>
                                            <PackageOpen className='h-4 w-4' />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Archive Note</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        )}
                    </div>
                    <div className='flex items-center gap-3'>
                        <Button
                            variant='destructive'
                            className='text-xl'
                            onClick={handleNoteDelete}>
                            <MdDeleteOutline />
                        </Button>
                        <Button onClick={handleNoteEdit}>Save</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default SelectedNote
