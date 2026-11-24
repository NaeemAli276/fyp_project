import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Message } from '@/constants/types'
import { useAuthStore } from '@/stores/authStore'
import AvatarImage from '../ui/AvatarImage'
import { formatTime } from '@/utils/stringUtils'

interface MessageCardProps extends Message {
    avatar_url: string | null
}

const MessageCard: React.FC<MessageCardProps> = ({
    id,
    chat_id,
    sender_id,
    content,
    media_url,
    message_type,
    created_at,
    avatar_url
}) => {

    const { user } = useAuthStore()
    
    useEffect(() => {
        console.log('sender_id: ', sender_id, '\n', 'user_id: ', user?.user_id)
    }, [])

    return (
        <View
            className={`${sender_id === user?.user_id ? 'justify-end pr-5' : 'justify-start pl-5'} items-center flex flex-row w-full h-auto`}
        >
            <View
                className={`flex items-end justify-end w-4/5 h-auto ${sender_id === user?.user_id ? 'flex-row-reverse' : 'flex-row'} gap-2`}
            >
                <AvatarImage
                    avatar_url={avatar_url}
                    size='xs'
                />   
                <View
                    className={`flex flex-col w-[90%] h-auto gap-1 ${sender_id === user?.user_id ? 'bg-primary dark:bg-dark_primary' : 'bg-text/10 dark:bg-background/10'} p-2 rounded-md items-end justify-end`}
                >
                    
                    <Text
                        className={`pl-1 font-poppins-regular ${sender_id === user?.user_id ? 'text-background' : 'dark:text-background text-text'}`}
                    >
                        {content}
                    </Text>
                    <Text
                        className={`text-sm font-poppins-light ${sender_id === user?.user_id ? 'text-background/90' : 'dark:text-background/80 text-text/80'}`}
                    >
                        {formatTime(created_at)}
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default MessageCard