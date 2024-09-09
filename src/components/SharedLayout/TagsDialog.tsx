import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import useCreateTag from '@/hooks/Tags/useCreateTag'
import useStore from '@/zustand/store'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useState } from 'react'
import Tag from './Tag'

const TagsDialog = () => {
    const { tagOpen, setTagOpen, tags } = useStore()
    const { loading, addTag } = useCreateTag()
    const [parent] = useAutoAnimate()

    const [name, setName] = useState<string>('')

    const handleCreateTag = async () => {
        if (name) await addTag(name)
        setName('')
    }

    return (
        <Dialog open={tagOpen} onOpenChange={setTagOpen}>
            <DialogContent className='flex-8 flex h-fit max-h-[80%] min-w-[40%] flex-col p-0'>
                <Card className='h-full overflow-y-auto border-none'>
                    <CardHeader>
                        <CardTitle className='text-2xl'>Manage Tags</CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-2'>
                        <div className='flex justify-between gap-3'>
                            <Input
                                placeholder='Create Tag'
                                value={name}
                                className='focus-visible:ring-0'
                                onChange={(e) => setName(e.target.value)}
                                autoFocus
                            />
                            <Button onClick={handleCreateTag} loading={loading}>
                                Create Tag
                            </Button>
                        </div>
                        <div ref={parent} className='space-y-2 text-xl'>
                            {tags.map((tag) => (
                                <Tag key={tag._id} tag={tag} />
                            ))}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            variant='outline'
                            className='w-full'
                            onClick={() => setTagOpen(false)}>
                            Cancel
                        </Button>
                    </CardFooter>
                </Card>
            </DialogContent>
        </Dialog>
    )
}
export default TagsDialog
