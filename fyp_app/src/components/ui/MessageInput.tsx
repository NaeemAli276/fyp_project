import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import DynamicIcon from './DynamicIcon'

interface MessageInputProps {
    value: string
    onChangeText: (text: string) => void
    onPress: () => void
}

const MessageInput: React.FC<MessageInputProps> = ({
    value,
    onChangeText,
    onPress
}) => {
    return (
        <View
            className='absolute bottom-0 left-0 flex flex-row items-center w-full h-auto p-4 px-7 bg-background dark:bg-dark_background'
        >
            <View
                className='relative w-full h-auto'
            >
                <TextInput
                    className='w-full p-4 rounded-full bg-text/10 font-poppins-regular placeholder:text-text/60 text-text dark:bg-background/10 dark:text-background dark:placeholder:text-background/60'
                    placeholder='Send a message...'
                    value={value}
                    onChangeText={onChangeText}
                    onPress={onPress}
                />
                <TouchableOpacity
                    className='absolute p-2 rounded-full right-2 bottom-2 bg-primary dark:bg-dark_primary text-background'
                >
                    <DynamicIcon
                        strokeWidth={1.2}
                        name={'Send'}
                        color={'#eff6ff'}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default MessageInput