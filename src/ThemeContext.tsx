import React, { createContext, useContext, useEffect, useState } from 'react';
import { Theme } from '@radix-ui/themes';

type ThemeAppearance = 'light' | 'dark' | 'inherit';

interface ThemeContextType {
    appearance: ThemeAppearance;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [appearance, setAppearance] = useState<ThemeAppearance>(() => {
        return (localStorage.getItem('radix-ui-theme') as ThemeAppearance) || 'inherit';
    });

    useEffect(() => {
        // Sync with system or just rely on manual? manual is fine for this demo.
    }, []);

    const toggleTheme = () => {
        setAppearance((prev) => {
            const newTheme = prev === 'dark' ? 'light' : 'dark';
            localStorage.setItem('radix-ui-theme', newTheme);
            return newTheme;
        });
    };

    return (
        <ThemeContext.Provider value={{ appearance, toggleTheme }}>
            <Theme appearance={appearance} scaling="100%">
                {children}
            </Theme>
        </ThemeContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
