import { createContext, useContext, useEffect, useState } from 'react'

export type TMode = 'light' | 'dark'

export type TFlavour = 'default' | 'rose' | 'red' | 'green' | 'yellow' | 'violet' | 'blue'

export type TTheme = `${TMode}-${TFlavour}` | 'system'

type ThemeProviderProps = {
    children: React.ReactNode
    defaultTheme?: TTheme
    storageKey?: string
}

type ThemeProviderState = {
    theme: TTheme
    setTheme: (theme: TTheme) => void
}

const initialState: ThemeProviderState = {
    theme: 'system',
    setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
    children,
    defaultTheme = 'system',
    storageKey = 'vite-ui-theme',
    ...props
}: ThemeProviderProps) {
    const [theme, setTheme] = useState<TTheme>(
        () => (localStorage.getItem(storageKey) as TTheme) || defaultTheme,
    )

    useEffect(() => {
        const root = window.document.documentElement

        root.classList.remove(
            'light-default',
            'dark-default',
            'light-rose',
            'dark-rose',
            'light-red',
            'dark-red',
            'light-green',
            'dark-green',
            'light-yellow',
            'dark-yellow',
            'light-violet',
            'dark-violet',
            'light-blue',
            'dark-blue',
        )

        if (theme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light'

            root.classList.add(systemTheme)
            return
        }

        root.classList.add(theme)
    }, [theme])

    const value = {
        theme,
        setTheme: (theme: TTheme) => {
            localStorage.setItem(storageKey, theme)
            setTheme(theme)
        },
    }

    return (
        <ThemeProviderContext.Provider {...props} value={value}>
            {children}
        </ThemeProviderContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext)

    if (context === undefined) throw new Error('useTheme must be used within a ThemeProvider')

    return context
}
