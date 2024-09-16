import useStore from '@/zustand/store'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { X } from 'lucide-react'
import { Button } from '../ui/button'

const TabList = () => {
    const tabList = useStore((state) => state.tabList)
    const removeTab = useStore((state) => state.removeTab)
    const selectedNote = useStore((state) => state.selectedNote)
    const setSelectedNote = useStore((state) => state.setSelectedNote)

    const [parent] = useAutoAnimate()

    return (
        <div
            ref={parent}
            className='tablist flex h-fit w-fit max-w-full items-center overflow-auto rounded-md bg-secondary'>
            {tabList.map((tab, index) => (
                <div
                    key={tab._id}
                    className={`${selectedNote?._id === tab._id ? 'rounded-md bg-background font-bold' : 'opacity-50'} m-1 border-primary px-1 transition-[background-color]`}>
                    <div
                        className='group flex min-w-20 cursor-pointer items-center gap-2 px-2'
                        onClick={() => {
                            setSelectedNote(tab)
                        }}>
                        <p className='mr-auto block max-w-32 overflow-hidden text-ellipsis whitespace-nowrap'>
                            {tab.title}
                        </p>
                        <Button
                            size='sm'
                            variant='ghost'
                            className='p-0 opacity-0 group-hover:opacity-100'
                            onClick={(e) => {
                                e.stopPropagation()
                                removeTab(tab)
                                if (tab._id !== selectedNote?._id) return
                                if (tabList[index - 1]) setSelectedNote(tabList[index - 1])
                                else if (tabList[index + 1]) setSelectedNote(tabList[index + 1])
                                else setSelectedNote(null)
                            }}>
                            <X className='h-4 w-4' />
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default TabList
