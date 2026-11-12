import { View, Text, Pressable, useColorScheme } from 'react-native'
import React from 'react'
import DynamicIcon from './DynamicIcon'

interface CustomCheckboxProps {
    name: string
    onPress: () => void,
    is_active: boolean
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
    name,
    onPress,
    is_active
}) => {

    const colorScheme = useColorScheme()

    return (
        <View
            className='flex flex-row items-center gap-2'
        >
            <Pressable
                className='flex items-center justify-center border rounded-md size-6 border-primary dark:border-dark_primary'
                onPress={onPress}
            >
                {
                    is_active
                    ?   <DynamicIcon // shows the actual tick
                            name='Check'
                            size={12}
                            color={colorScheme === 'dark' ? '#eff6ff' : '#3b82f6'}
                        />   
                    :   <DynamicIcon // just used for when it is inactive, just an empty box
                            name='Check'
                            size={12}
                            color={colorScheme === 'dark' ? '#111827' : '#eff6ff'}
                        />
                }                
            </Pressable>
            <Text
                className='text-text/80 dark:text-background/80 font-poppins-light pt-0.5'
            >   
                {name}
            </Text>
        </View>
    )
}

export default CustomCheckbox