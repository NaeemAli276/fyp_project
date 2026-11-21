import { View, Text, TextInput } from 'react-native'
import React from 'react'

interface MessageInputProps {
    value: string
    onChangeText: (text: string) => void
    onPress: () => void
}

const MessageInput = ({

}) => {
    return (
        <View
            className='absolute bottom-0 left-0 w-full h-auto p-4 px-7 bg-background dark:bg-dark_background'
        >
            <TextInput
                className='bg-dark_background/10'
            />
        </View>
    )
}

export default MessageInput