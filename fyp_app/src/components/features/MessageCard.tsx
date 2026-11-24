import { View, Text } from 'react-native'
import React from 'react'
import { Message } from '@/constants/types'

const MessageCard: React.FC<Message> = ({
    id,
    chat_id,
    sender_id,
    content,
    media_url,
    message_type,
    created_at
}) => {
    return (
        <View>
            <Text>MessageCard</Text>
        </View>
    )
}

export default MessageCard