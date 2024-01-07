
import { createContext, useContext } from 'react';
import useRequestManager from '../hooks/useRequestManager';
import useFetchUsers from '../../features/user/hooks/useFetchUsers';
import useSignIn from '../../features/auth/hooks/useSignIn';
import useFetchIntervalRates from '../../features/train/hooks/useFetchIntervalRates';
import useKeyPressManager from '../hooks/useKeyPressManager';
import useMidiIO from '../../features/sounds/hooks/useMidiIO';
import useMidiIOWithKeyPress from '../../features/sounds/hooks/useMidiIOWithKeyPress';
import useSoundPlayerWithTone from '../../features/sounds/hooks/useSoundPlayerWithTone';
import useTimerManager from '../hooks/useTimerManager';
import useTrainManager from '../../features/train/hooks/useTrainManager';
import useBeatManager from '../../features/train/hooks/useBeatManager';
import useAnswerManager from '../../features/train/hooks/useAnswerManager';
import useIntervalGeneratorRandom from '../../features/train/classes/useIntervalGeneratorRandom';
import usePostTrainRecord from '../../features/train/hooks/usePostTrainRecord';
import useFetchTrainRecord from '../../features/train/hooks/useFetchTrainRecord';
import useFetchQuestionnaireTemplate from '../../features/questionnaire/hooks/useFetchQuestionnaireTemplate';

interface DependencyContextType {
    useRequestManager: typeof useRequestManager,
    useFetchUsers: typeof useFetchUsers,
    useSignIn: typeof useSignIn,
    useFetchIntervalRates: typeof useFetchIntervalRates,
    useKeyPressManager: typeof useKeyPressManager,
    // useMidiIO: typeof useMidiIOWithKeyPress,
    useMidiIO: typeof useMidiIO,
    useSoundPlayerWithTone: typeof useSoundPlayerWithTone,
    useTimerManager: typeof useTimerManager,
    useTrainManager: typeof useTrainManager,
    useBeatManager: typeof useBeatManager,
    useAnswerManager: typeof useAnswerManager,
    useIntervalGenerator: typeof useIntervalGeneratorRandom,
    usePostTrainRecord: typeof usePostTrainRecord,
    useFetchTrainRecord: typeof useFetchTrainRecord,
    useFetchQuestionnaireTemplate: typeof useFetchQuestionnaireTemplate,
}

const initialValue: DependencyContextType = {
    useRequestManager: null!,
    useFetchUsers: null!,
    useSignIn: null!,
    useFetchIntervalRates: null!,
    useKeyPressManager: null!,
    useMidiIO: null!,
    useSoundPlayerWithTone: null!,
    useTimerManager: null!,
    useTrainManager: null!,
    useBeatManager: null!,
    useAnswerManager: null!,
    useIntervalGenerator: null!,
    usePostTrainRecord: null!,
    useFetchTrainRecord: null!,
    useFetchQuestionnaireTemplate: null!,
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
        // useMidiIO: useMidiIOWithKeyPress,
        useMidiIO,
        useSoundPlayerWithTone,
        useTimerManager,
        useTrainManager,
        useBeatManager,
        useAnswerManager,
        useIntervalGenerator: useIntervalGeneratorRandom,
        usePostTrainRecord,
        useFetchTrainRecord,
        useFetchQuestionnaireTemplate,
    }

    return (
        <DependencyContext.Provider value={value}>
            {children}
        </DependencyContext.Provider>
    );
}
