
import { createContext, useContext } from 'react';
import useRequestManager from '../hooks/useRequestManager';
import useFetchUsers from '../../features/user/hooks/useFetchUsers';
import useSignIn from '../../features/auth/hooks/useSignIn';
import useFetchIntervalRates from '../../features/train/hooks/useFetchIntervalRates';

interface DependencyContextType {
    useRequestManager: typeof useRequestManager,
    useFetchUsers: typeof useFetchUsers,
    useSignIn: typeof useSignIn,
    useFetchIntervalRates: typeof useFetchIntervalRates,
}

const initialValue: DependencyContextType = {
    useRequestManager: null!,
    useFetchUsers: null!,
    useSignIn: null!,
    useFetchIntervalRates: null!,
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
        useFetchUsers,
        useSignIn,
        useFetchIntervalRates,
    }

    return (
        <DependencyContext.Provider value={value}>
            {children}
        </DependencyContext.Provider>
    );
}
