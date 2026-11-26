import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import DynamicIcon from './DynamicIcon'
import { Contact } from '@/constants/types'

interface MessageInputProps {
    value: string
    onChangeText: (text: string) => void
    onPress: () => void
}

const MessageInput: React.FC<MessageInputProps> = ({
    value,
    onChangeText,
    onPress,
}) => {
    return (
        <View
            className='absolute bottom-0 left-0 flex flex-row items-center w-full h-auto p-4 px-7 bg-background dark:bg-dark_background'
        >
            <View
                className='relative w-full h-auto'
            >
                <TextInput
                    className='w-full pl-4 pr-16 rounded-full h-14 bg-text/10 font-poppins-regular placeholder:text-text/60 text-text dark:bg-background/10 dark:text-background dark:placeholder:text-background/60'
                    placeholder='Send a message...'
                    value={value}
                    onChangeText={onChangeText}
                    numberOfLines={1}
                />
                <View
                    className={`absolute bottom-0 right-0 flex items-center justify-center p-2 rounded-r-full h-14 ${value !== '' ? 'flex' : 'hidden'}`}
                >
                    <TouchableOpacity
                        className={`p-2 rounded-full bg-primary dark:bg-dark_primary text-background`}
                        onPress={onPress}
                    >
                        <DynamicIcon
                            strokeWidth={1.2}
                            name={'Send'}
                            color={'#eff6ff'}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default MessageInput