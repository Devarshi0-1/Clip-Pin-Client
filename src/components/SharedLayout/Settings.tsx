import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import useStore from '@/zustand/store'
import { Settings2, Tags } from 'lucide-react'
import { Switch } from '../ui/switch'
import CustomizeTheme from './Customize-Theme'

const Settings = () => {
    const highlightMode = useStore((state) => state.highlightMode)
    const setHighlightMode = useStore((state) => state.setHighlightMode)
    const setTagOpen = useStore((state) => state.setTagOpen)

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='outline'>
                    <Settings2 className='h-4 w-4' />
                </Button>
            </DialogTrigger>
            <DialogContent className='min-w-[600px]'>
                <DialogHeader className='mb-5'>
                    <DialogTitle className='text-3xl'>Settings</DialogTitle>
                </DialogHeader>
                <div className='flex flex-col gap-4'>
                    <div className='flex items-center justify-between'>
                        <p className='font-semibold'>Selection Mode</p>
                        <Switch
                            onCheckedChange={(val) => setHighlightMode(val)}
                            checked={highlightMode}
                        />
                    </div>
                    <div className='flex items-center justify-between'>
                        <p className='font-semibold'>Manage Tags</p>
                        <Button
                            className='flex items-center gap-3 rounded-lg px-3 py-2'
                            onClick={() => setTagOpen(true)}
                            variant='secondary'>
                            <Tags className='h-6 w-6' />
                            <p>Tags</p>
                        </Button>
                    </div>
                    <div>
                        <p className='font-semibold'>Theme</p>
                        <CustomizeTheme />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
export default Settings
