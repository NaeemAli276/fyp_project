import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'


interface SplashScreenBtnProps {
    ftn: () => void
    name: string,
}

const SplashScreenBtn: React.FC<SplashScreenBtnProps> = ({
    ftn,
    name,
}) => {
    return (
        <TouchableOpacity
            className={
                name === 'Register' 
                ? 'w-full h-auto p-3 bg-background dark:bg-dark_background border-2 border-primary rounded-md dark:border-dark_primary' 
                : 'w-full h-auto p-3 bg-primary dark:bg-dark_primary rounded-md border-2 border-primary dark:border-dark_primary'
            }
            onPress={ftn}
        >
            <Text
                className={`text-xl font-poppins-medium ${name == 'Login' ? 'text-background' : 'text-text dark:text-background'} text-center`}
            >
                {name}
            </Text>
        </TouchableOpacity>
    )
}

export default SplashScreenBtn