import { View, Text, useColorScheme, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Message } from '@/constants/types'
import { useAuthStore } from '@/stores/authStore'
import AvatarImage from '../ui/AvatarImage'
import { formatTime } from '@/utils/stringUtils'
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet'
import VerboseBtn from '../ui/VerboseBtn'
import DynamicIcon from '../ui/DynamicIcon'

interface MessageCardProps extends Message {
    avatar_url?: string | null
    handle_delete_message: () => Promise<void>
}

const MessageCard: React.FC<MessageCardProps> = ({
    id,
    chat_id,
    sender_id,
    content,
    media_url,
    message_type,
    created_at,
    avatar_url = null,
    handle_delete_message
}) => {

    const { user } = useAuthStore()
    const colorScheme = useColorScheme()
    
    const action_sheet_ref = useRef<ActionSheetRef>(null)

    // useEffect(() => {
    //     console.log('sender_id: ', sender_id, '\n', 'user_id: ', user?.user_id)
    // }, [])

    return (
        <>  
            <View
                className={`${sender_id === user?.user_id ? 'justify-end pr-3' : 'justify-start pl-3'} items-center flex flex-row w-full h-auto`}
            >
                <TouchableOpacity
                    className={`flex items-end justify-start w-4/5 h-auto ${sender_id === user?.user_id ? 'flex-row-reverse' : 'flex-row'} gap-2`}
                    onLongPress={() => action_sheet_ref.current?.show()}
                    disabled={sender_id !== user?.user_id}
                >
                    <AvatarImage
                        avatar_url={avatar_url}
                        size='xs'
                    />   
                    <View
                        className={`flex flex-col max-w-[90%] w-auto h-auto gap-0 ${sender_id === user?.user_id ? 'bg-primary dark:bg-dark_primary' : 'bg-text/10 dark:bg-background/10'} p-2 rounded-md items-end justify-end`}
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
                </TouchableOpacity>
            </View>
            <ActionSheet
                ref={action_sheet_ref}
                containerStyle={{
                    height: 4 * 32,
                    width: '100%',
                    backgroundColor: colorScheme === 'dark' ? '#111827' : '#eff6ff',
                    borderTopLeftRadius: 4 * 8,
                    borderTopRightRadius: 4 * 8,
                    paddingHorizontal: 4 * 7,
                    paddingVertical: 4 * 4
                }}
            >
                <VerboseBtn
                    icon_name={'Trash'}
                    btn_purpose='Delete message'
                    onPress={handle_delete_message}
                />
            </ActionSheet>
        </>
    )
}

export default MessageCard