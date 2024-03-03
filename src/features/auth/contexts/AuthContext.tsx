
import { createContext, useContext, useState } from 'react';
import IUser from '../../user/interfaces/IUser';
import { useDependency } from '../../../general/contexts/DependencyContext';

interface AuthContextType {
    currentUser: IUser | null,
    signIn: (email: string, password: string) => Promise<boolean>,
    requireSignIn: () => void,
}

const initialValue: AuthContextType = {
    currentUser: null,
    signIn: null!,
    requireSignIn: null!,
}

const AuthContext = createContext<AuthContextType>(initialValue);

export function useAuth() {
    return useContext(AuthContext);
}

interface AuthProviderProps {
    children: React.ReactNode
}
export function AuthProvider({ children }: AuthProviderProps) {
    const [currentUser, setCurrentUser] = useState<IUser | null>(null);
    const { useSignIn } = useDependency();
    const signInManager = useSignIn();

    function signIn(email: string, password: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            console.log("sign in!");
            signInManager.signIn(email, password)
                .then(res => {
                    setCurrentUser(res!.user);
                    resolve(true);
                })
                .catch(err => {
                    reject(false);
                });
        });
    }

    function requireSignIn() {
        if (currentUser) return;
        
        window.alert("ユーサが選択されていません。");

        if (window.location.pathname !== "/users") {
            window.location.href = "/users";
        }
    }

    const value: AuthContextType = {
        currentUser: currentUser,
        signIn: signIn,
        requireSignIn: requireSignIn,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
