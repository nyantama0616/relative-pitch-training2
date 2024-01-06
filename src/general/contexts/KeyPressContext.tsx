
import { createContext, useContext } from 'react';
import IKeyPressManager, { IKeyDownInfo, IKeyUpInfo } from '../interfaces/IKeyPressManager';
import { useDependency } from './DependencyContext';
import { Box } from '@mui/material';

interface KeyPressContextType {
    keyDownInfo: IKeyDownInfo;
    keyUpInfo: IKeyUpInfo;
}

const initialValue: KeyPressContextType = {
    keyDownInfo: null!,
    keyUpInfo: null!,
}

const KeyPressContext = createContext<KeyPressContextType>(initialValue);

export function useKeyPress() {
    return useContext(KeyPressContext);
}

interface KeyPressProviderProps {
    children: React.ReactNode
}
export function KeyPressProvider({ children }: KeyPressProviderProps) {
    const { useKeyPressManager } = useDependency();
    const keyPressManager = useKeyPressManager();

    const value: KeyPressContextType = {
        keyDownInfo: keyPressManager.keyDownInfo,
        keyUpInfo: keyPressManager.keyUpInfo,
    }

    return (
        <KeyPressContext.Provider
            value={value}
        >
            <Box
                tabIndex={0}
                onKeyDown={e => keyPressManager.handleKeyDown(e)}
                onKeyUp={e => keyPressManager.handleKeyUp(e)}
            >
                {children}
            </Box>
        </KeyPressContext.Provider>
    );
}
