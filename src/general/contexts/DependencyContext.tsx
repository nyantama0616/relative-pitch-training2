
import { createContext, useContext } from 'react';
import useRequestManager from '../hooks/useRequestManager';
import useFetchUsers from '../../features/user/hooks/useFetchUsers';
import useSignIn from '../../features/auth/hooks/useSignIn';
import useFetchIntervalRates from '../../features/train/hooks/useFetchIntervalRates';
import useKeyPressManager from '../hooks/useKeyPressManager';
import useMidiIOWithKeyPress from '../../features/sounds/hooks/useMidiIOWithKeyPress';
import useSoundPlayerWithTone from '../../features/sounds/hooks/useSoundPlayerWithTone';
import useTimerManager from '../hooks/useTimerManager';
import useTrainManager from '../../features/train/hooks/useTrainManager';

interface DependencyContextType {
    useRequestManager: typeof useRequestManager,
    useFetchUsers: typeof useFetchUsers,
    useSignIn: typeof useSignIn,
    useFetchIntervalRates: typeof useFetchIntervalRates,
    useKeyPressManager: typeof useKeyPressManager,
    useMidiIOWithKeyPress: typeof useMidiIOWithKeyPress,
    useSoundPlayerWithTone: typeof useSoundPlayerWithTone,
    useTimerManager: typeof useTimerManager,
    useTrainManager: typeof useTrainManager,
}

const initialValue: DependencyContextType = {
    useRequestManager: null!,
    useFetchUsers: null!,
    useSignIn: null!,
    useFetchIntervalRates: null!,
    useKeyPressManager: null!,
    useMidiIOWithKeyPress: null!,
    useSoundPlayerWithTone: null!,
    useTimerManager: null!,
    useTrainManager: null!,
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
        useKeyPressManager,
        useMidiIOWithKeyPress,
        useSoundPlayerWithTone,
        useTimerManager,
        useTrainManager,
    }

    return (
        <DependencyContext.Provider value={value}>
            {children}
        </DependencyContext.Provider>
    );
}
