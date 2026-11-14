export type RootStackParamList = {
    index: undefined
    loginScreen: undefined; 
    registerScreen: undefined,
    splashScreen: undefined
};

export interface User {
    id: string
    display_name: string
}

export interface Contact extends User {
    recent_message: string
    time: string
}