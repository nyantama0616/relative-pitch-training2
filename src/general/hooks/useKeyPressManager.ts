import { useState } from "react";

import IKeyPressManager, { IKeyDownInfo, IKeyUpInfo } from "../interfaces/IKeyPressManager";

const initialKeyDownInfo: IKeyDownInfo = {
    count: 0,
    key: ""
}

export default function useKeyPressManager(): IKeyPressManager {
    const [keyDownInfo, setKeydownInfo] = useState<IKeyDownInfo>(initialKeyDownInfo);
    const [keyUpInfo, setKeyUpInfo] = useState<IKeyUpInfo>(initialKeyDownInfo);
    const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set<string>()); //長押し禁止のために、押されているキーを記録する

    function handleKeyDown(e: React.KeyboardEvent<Element>) {
        if (pressedKeys.has(e.key)) return;

        setKeydownInfo(prev => {
            const newKeydownInfo = {
                count: prev.count + 1,
                key: e.key
            };

            return newKeydownInfo;
        });

        setPressedKeys(prev => {
            const newPressedKeys = new Set<string>(prev);
            newPressedKeys.add(e.key);

            return newPressedKeys;
        });
    }
    
    function handleKeyUp(e: React.KeyboardEvent<Element>) {
        setKeyUpInfo(prev => {
            const newKeyUpInfo = {
                count: prev.count + 1,
                key: e.key
            };

            return newKeyUpInfo;
        });

        setPressedKeys(prev => {
            const newPressedKeys = new Set<string>(prev);
            newPressedKeys.delete(e.key);

            return newPressedKeys;
        });
    }

    return {
        keyDownInfo,
        handleKeyDown,
        keyUpInfo,
        handleKeyUp,
    }
}
