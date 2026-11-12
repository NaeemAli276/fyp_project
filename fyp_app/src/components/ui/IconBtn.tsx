import { View, Text, TouchableOpacity, useColorScheme } from 'react-native'
import React from 'react'
import DynamicIcon from './DynamicIcon'

interface IconBtnProps {
    name: any
    onPress: () => void
    size: number
    strokeWidth: number
}

const IconBtn: React.FC<IconBtnProps> = ({
    name, 
    onPress,
    size,
    strokeWidth
}) => {
    
    const colorScheme = useColorScheme()

    return (
        <TouchableOpacity
            onPress={onPress}
            className='p-1'
        >
            <DynamicIcon
                name={name}
                size={size}
                strokeWidth={strokeWidth}
                color={colorScheme === 'dark' ? '#eff6ff' : '#1e3a8a'}
            />
        </TouchableOpacity>
    )
}

export default IconBtn