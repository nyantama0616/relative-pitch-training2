
import { createContext, useContext, useState } from 'react';
import IUser from '../../user/interfaces/IUser';
import { useDependency } from '../../../general/contexts/DependencyContext';

interface AuthContextType {
    currentUser: IUser | null,
    signIn: (email: string, password: string) => Promise<boolean>,
}

const initialValue: AuthContextType = {
    currentUser: null,
    signIn: null!,
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

    const value: AuthContextType = {
        currentUser: currentUser,
        signIn: signIn,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
