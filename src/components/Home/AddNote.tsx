import { Button } from '@/components/ui/button'
import useAddNote from '@/hooks/Notes/useAddNote'
import type { ClipboardEvent, FC, FormEvent } from 'react'
import { useEffect, useRef, useState } from 'react'
import { IoAddCircleOutline } from 'react-icons/io5'

const AddNote: FC = () => {
    const { addNote } = useAddNote()

    const [buttonVisibility, setButtonVisibility] = useState<boolean>(false)
    const titleRef = useRef<HTMLPreElement>(null)
    const contentRef = useRef<HTMLPreElement>(null)

    const handleAddNoteSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!titleRef.current || !contentRef.current) return

        await addNote(titleRef.current?.innerText, contentRef.current?.innerText)

        titleRef.current.innerText = ''
        contentRef.current.innerText = ''
    }

    const handlePaste = (e: ClipboardEvent<HTMLPreElement>) => {
        e.preventDefault()
        const text = e.clipboardData.getData('text/plain')
        document.execCommand('insertHTML', false, text)
    }

    useEffect(() => {
        titleRef.current?.focus()
    }, [])

    return (
        <div className='m-auto mt-10 w-1/3 space-y-4'>
            <form
                onSubmit={handleAddNoteSubmit}
                className='space-y-4 rounded-sm border px-3 py-2'
                onBlur={() =>
                    setButtonVisibility(
                        !!titleRef.current?.innerText || !!contentRef.current?.innerText,
                    )
                }>
                <pre
                    tabIndex={0}
                    ref={titleRef}
                    data-text='Title'
                    contentEditable={true}
                    onInput={() =>
                        setButtonVisibility(
                            !!titleRef.current?.innerText || !!contentRef.current?.innerText,
                        )
                    }
                    onPaste={handlePaste}
                    className='w-full text-wrap font-[inherit] text-xl outline-none'
                />
                {buttonVisibility && (
                    <>
                        <pre
                            tabIndex={0}
                            ref={contentRef}
                            data-text='Take a note'
                            contentEditable={true}
                            onInput={() =>
                                setButtonVisibility(
                                    !!titleRef.current?.innerText ||
                                        !!contentRef.current?.innerText,
                                )
                            }
                            onPaste={handlePaste}
                            className='w-full text-wrap font-[inherit] text-xl outline-none'
                        />

                        <Button type='submit' className='w-full'>
                            Add Note
                            <IoAddCircleOutline className='ml-1 text-2xl' />
                        </Button>
                    </>
                )}
            </form>
        </div>
    )
}

export default AddNote
