import { View, Text, TouchableOpacity, useColorScheme } from 'react-native'
import React from 'react'
import DynamicIcon from './DynamicIcon'

interface IconBtnProps {
    name: any
    onPress: () => void
    size: number
    strokeWidth: number,
    colour?: string
}

const IconBtn: React.FC<IconBtnProps> = ({
    name, 
    onPress,
    size,
    strokeWidth,
    colour = '#eff6ff',
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
                color={colour}
            />
        </TouchableOpacity>
    )
}

export default IconBtn