import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'


interface CustomTextInputProps {
    name: string
    placeholder: string
    children: any | null
    error_message: string
    type: string
    value: string
    onChangeText: () => void
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
    name = 'handle',
    placeholder = 'Enter your handle...',
    children,
    error_message = 'Enter a valid handle',
    type = 'password',
    value = '',
    onChangeText
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
                        border-2 rounded-lg font-poppins-regular pl-3 pt-6 pb-2 text-text dark:text-background  border-primary dark:border-dark_primary
                    `}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={type === 'password' ? true : false}
                />    
                <View>
                    {children}
                </View>
            </View>
            <Text>CustomTextInput</Text>
        </View>
    )
}

export default CustomTextInput