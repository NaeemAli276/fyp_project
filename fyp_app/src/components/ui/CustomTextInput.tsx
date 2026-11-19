import { View, Text, TextInput, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import DynamicIcon from './DynamicIcon'

interface CustomTextInputProps {
    name: string
    placeholder: string
    type: string
    value: string
    onChangeText: (text: string) => void,
    onPress?: () => void
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
    name = 'handle',
    placeholder = 'Enter your handle...',
    type = 'text',
    value = '',
    onChangeText,
    onPress
}) => {


    const [is_error_active, set_is_error_active] = useState<boolean>(false)

    return (
        <View
            className='flex flex-col w-full h-auto gap-2'
        >   
            <View
                className='relative w-full h-auto'
            >
                <Text
                    className={`absolute top-2 left-3.5 font-poppins-regular text-sm text-text/80 dark:text-background/80`}
                >
                    {name}    
                </Text>

                <TextInput
                    className={`
                        border rounded-lg font-poppins-regular pb-2 pl-3 pt-7 text-text dark:text-background  border-primary dark:border-dark_primary placeholder:text-text/80 dark:placeholder:text-background/80
                    `}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={type === 'password' ? true : false}
                    onPress={onPress}
                />    
            </View>
        </View>
    )
}

export default CustomTextInput