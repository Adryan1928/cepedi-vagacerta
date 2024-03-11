import React, { createContext, useState } from 'react';
import { User } from '../@types/user';

interface MainContextProps{
    user: User;
    setUser: (user:User) => void;
}

export const MainContext = createContext<MainContextProps>({} as MainContextProps)

export default function MainProvider({ children }: { children: React.ReactNode}){
    const [user, setUser] = useState<User>({} as User)

    return (
        <MainContext.Provider value={{user, setUser}}>
            {children}
        </MainContext.Provider>
    )
}