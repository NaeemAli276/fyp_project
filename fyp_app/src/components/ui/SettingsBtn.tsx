import { View, Text, Settings, useColorScheme, TouchableOpacity } from 'react-native'
import React from 'react'
import DynamicIcon from './DynamicIcon'
import { LucideProps } from 'lucide-react-native'

interface SettingsBtn {
    name: string
    icon_name: any
    onPress: () => void
    icon_colour: 'red' | "default"
}

const SettingsBtn: React.FC<SettingsBtn> = ({
    name,
    icon_name,
    onPress,
    icon_colour = 'default'
}) => {

    const colorScheme = useColorScheme()

    return (
        <TouchableOpacity
            className='flex flex-row items-center w-full h-auto gap-4'
            onPress={onPress}
        >
            <DynamicIcon
                name={icon_name}
                size={24}
                color={icon_colour === 'red' ? '#f43f5e' : 
                    colorScheme === 'dark'
                    ?   '#5b98ff'
                    :   '#3b82f6'
                }
                strokeWidth={1.2}
            />
            <Text
                className='text-lg text-text dark:text-background font-poppins-regular'
            >
                {name}
            </Text>
        </TouchableOpacity>
    )
}

export default SettingsBtn