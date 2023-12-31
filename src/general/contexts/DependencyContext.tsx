
import { createContext, useContext } from 'react';
import useRequestManager from '../hooks/useRequestManager';

interface DependencyContextType {
    useRequestManager: typeof useRequestManager,
}

const initialValue: DependencyContextType = {
    useRequestManager,
}

const DependencyContext = createContext<DependencyContextType>(initialValue);

export function useDependency() {
    return useContext(DependencyContext);
}

interface DependencyProviderProps {
    children: React.ReactNode
}
export function DependencyProvider({ children }: DependencyProviderProps) {
    const value: DependencyContextType = {
        useRequestManager,
    }

    return (
        <DependencyContext.Provider value={value}>
            {children}
        </DependencyContext.Provider>
    );
}
