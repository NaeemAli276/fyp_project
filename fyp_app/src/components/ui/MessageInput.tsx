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
            className='absolute bottom-0 left-0 flex flex-row items-center w-full h-auto p-4 pr-6 pl-7 bg-background dark:bg-dark_background'
        >
            <TextInput
                className='pt-3 pl-3.5 rounded-md bg-text/10 font-poppins-regular placeholder:text-text/60 text-text w-4/5 dark:bg-background/10 dark:text-background dark:placeholder:text-background/60'
                placeholder='Send a message...'
                value={value}
                onChangeText={onChangeText}
                onPress={onPress}
            />
            <View
                className='flex items-end justify-end w-1/5 h-auto'
            >
                <TouchableOpacity
                    className='p-3 rounded-full bg-primary dark:bg-dark_primary'
                >
                    <DynamicIcon
                        name='Send'
                        strokeWidth={1.5}
                        color={'#eff6ff'}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default MessageInput