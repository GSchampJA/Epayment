import { ReactNode, createContext, useState } from "react";


export interface userAuth {
    logIn: boolean,
    address?: string,
    privatekey?: string,
    walletInfo?: string, // or object
    effectiveTimestamp?: Date,

}
type UserInfoState = [userAuth, React.Dispatch<React.SetStateAction<userAuth>>];

export const UserInfoContext = createContext<UserInfoState>([{
    logIn: false,

},() => null]);


interface UserInfoProviderProps {
    children: ReactNode;
    // Your other props here.
}


export const UserInfoProvider = ({children, ...props}: UserInfoProviderProps) => {
    const [userInfo, setUserInfo] = useState<userAuth>({
        logIn: false,

    });
    return (
        <UserInfoContext.Provider value={[userInfo, setUserInfo]} {...props}>{children}</UserInfoContext.Provider>
    )
};


// export const useAuth = () => {
//     // const userInfo = useContext<userAuth>({});
// }
// export const UserInfoContext = createContext<[userAuth, React.Dispatch<React.SetStateAction<userAuth>>]>([{}, {}]);
