import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import useCreateTag from '@/hooks/Tags/useCreateTag'
import useStore from '@/zustand/store'
import { useEffect, useRef, useState } from 'react'
import Tag from './Tag'

const TagsDialog = () => {
    const { tagOpen, setTagOpen, tags } = useStore()
    const { addTag } = useCreateTag()

    const [name, setName] = useState<string>('')
    const createTagRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        createTagRef.current?.focus()

        return () => createTagRef.current?.blur()
    }, [])

    const handleCreateTag = async () => {
        if (name) await addTag(name)
        setName('')
    }

    return (
        <Dialog open={tagOpen} onOpenChange={setTagOpen}>
            <DialogContent className='flex-8 flex h-fit max-h-[80%] min-w-[40%] flex-col p-0'>
                <Card className='h-full overflow-y-auto border-none'>
                    <CardHeader>
                        <CardTitle className='text-3xl'>Manage Tags</CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-2'>
                        <div className='space-y-2 text-xl'>
                            {tags.map((tag) => (
                                <Tag key={tag._id} tag={tag} />
                            ))}
                        </div>
                        <Input
                            placeholder='Create Tag'
                            value={name}
                            ref={createTagRef}
                            className='focus-visible:ring-0'
                            onChange={(e) => setName(e.target.value)}
                        />
                    </CardContent>
                    <CardFooter className='flex justify-between'>
                        <Button variant='outline' onClick={() => setTagOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleCreateTag}>Create</Button>
                    </CardFooter>
                </Card>
            </DialogContent>
        </Dialog>
    )
}
export default TagsDialog
