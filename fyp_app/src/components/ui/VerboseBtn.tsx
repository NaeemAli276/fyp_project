import { View, Text, TouchableOpacity, useColorScheme } from 'react-native'
import React from 'react'
import DynamicIcon from './DynamicIcon'

interface VerboseBtnProps {
    icon_name: any
    btn_purpose: string,
    onPress: () => void
}

const VerboseBtn: React.FC<VerboseBtnProps> = ({
    icon_name,
    btn_purpose,
    onPress
}) => {

    const colorScheme = useColorScheme()

    return (
        <TouchableOpacity
            onPress={onPress}
            className='flex flex-row items-center w-full h-auto gap-3'
        >
            <DynamicIcon
                name={icon_name}
                size={24}
                strokeWidth={1.2}
                color={colorScheme === 'dark' ? '#5b98ff' : '#3b82f6'}
            />
            <Text
                className='text-text dark:text-background font-poppins-regular'
            >
                {btn_purpose}
            </Text>
        </TouchableOpacity>
    )
}

export default VerboseBtn