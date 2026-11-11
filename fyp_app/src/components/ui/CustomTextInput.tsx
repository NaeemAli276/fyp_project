import { View, Text } from 'react-native'
import React, { useState } from 'react'


interface CustomTextInputProps {
    name: string
    placeholder: string
    children: any
    error_message: string
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
    name,
    placeholder,
    children,
    error_message
}) => {

    const [is_error_active, set_is_error_active] = useState<boolean>(false)

    return (
        <View
            className='flex flex-col gap-2'
        >   
            <Text>CustomTextInput</Text>
        </View>
    )
}

export default CustomTextInput