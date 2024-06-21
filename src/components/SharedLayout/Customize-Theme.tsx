import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { TFlavour, TMode, TRadius, TTheme, TThemeData } from '@/types'
import { ResetIcon } from '@radix-ui/react-icons'
import { CheckIcon, MoonIcon, SunIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTheme } from '../theme-provider'

const themes: TThemeData[] = [
    { displayName: 'Zinc', mode: 'default', color: 'hsl(240, 5%, 34%)' },
    { displayName: 'Rose', mode: 'rose', color: 'hsl(347, 77%, 50%)' },
    { displayName: 'Red', mode: 'red', color: 'hsl(0, 72%, 51%)' },
    { displayName: 'Green', mode: 'green', color: 'hsl(142, 71%, 45%)' },
    { displayName: 'Yellow', mode: 'yellow', color: 'hsl(48, 96%, 53%)' },
    { displayName: 'Violet', mode: 'violet', color: 'hsl(263, 70%, 50%)' },
    { displayName: 'Blue', mode: 'blue', color: 'hsl(217, 91%, 60%)' },
] as const

const radiusArr: TRadius[] = ['0', '0.3', '0.5', '0.75', '1.0']

const CustomizeTheme = () => {
    const storedGlobalTheme = localStorage.getItem('vite-ui-theme')
    const storedTheme = storedGlobalTheme?.split('-')[0] || 'dark'
    const storedFlavour = storedGlobalTheme?.split('-')[1] || 'default'
    const storedRadius = localStorage.getItem('vite-border-radius') || '0.5'

    const [theme, setTheme] = useState(storedTheme as TMode)
    const [flavour, setFlavour] = useState(storedFlavour as TFlavour)
    const { setTheme: setGlobalTheme, theme: globalTheme } = useTheme()
    const [border, setBorder] = useState(storedRadius as TRadius)
    const jointTheme: TTheme = `${theme}-${flavour}`

    useEffect(() => {
        setGlobalTheme(jointTheme)
        localStorage.setItem('vite-ui-theme', jointTheme)
    }, [flavour, theme])

    useEffect(() => {
        window.document.documentElement.style.setProperty('--radius', `${border}rem`)
        localStorage.setItem('vite-border-radius', `${border}`)
    }, [border])

    return (
        <div className='flex flex-1 flex-col space-y-4 pl-5 md:space-y-6'>
            <div>
                <div className='flex items-center justify-between'>
                    <Label className='text-xs'>Color</Label>
                    <Button
                        variant='ghost'
                        size='icon'
                        className='rounded-[0.5rem]'
                        onClick={() => setGlobalTheme('dark-default')}>
                        <ResetIcon />
                        <span className='sr-only'>Reset</span>
                    </Button>
                </div>
                <div className='grid grid-cols-4 gap-2'>
                    {themes.map((theme) => (
                        <Button
                            variant={'outline'}
                            size='sm'
                            key={theme.mode}
                            onClick={() => setFlavour(theme.mode)}
                            className='flex justify-start'>
                            <span
                                className='mr-2 flex h-5 w-5 shrink-0 -translate-x-1 items-center justify-center rounded-full'
                                style={{ backgroundColor: theme.color }}>
                                {globalTheme.includes(theme.mode) && (
                                    <CheckIcon className='h-4 w-4 text-white' />
                                )}
                            </span>
                            {theme.displayName}
                        </Button>
                    ))}
                </div>
            </div>
            <div className='space-y-1.5'>
                <Label className='text-xs'>Radius</Label>
                <div className='grid grid-cols-5 gap-2'>
                    {radiusArr.map((value) => {
                        return (
                            <Button
                                variant={border === value ? 'default' : 'outline'}
                                size='sm'
                                key={value}
                                onClick={() => setBorder(value)}
                                className='rounded-[0.5rem] border-2 border-primary'>
                                {value}
                            </Button>
                        )
                    })}
                </div>
            </div>
            <div className='space-y-1.5'>
                <Label className='text-xs'>Mode</Label>
                <div className='grid grid-cols-3 gap-2'>
                    <Button
                        variant={theme === 'light' ? 'default' : 'outline'}
                        size='sm'
                        onClick={() => setTheme('light')}
                        className='rounded-[0.5rem]'>
                        <SunIcon className='mr-1 -translate-x-1' />
                        Light
                    </Button>
                    <Button
                        variant={theme === 'dark' ? 'default' : 'outline'}
                        size='sm'
                        onClick={() => setTheme('dark')}
                        className='rounded-[0.5rem]'>
                        <MoonIcon className='mr-1 -translate-x-1' />
                        Dark
                    </Button>
                </div>
            </div>
        </div>
    )
}
export default CustomizeTheme
