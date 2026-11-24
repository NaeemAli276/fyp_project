import { FlatList, View, Text, TouchableOpacity, useColorScheme, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import DynamicIcon from '@/components/ui/DynamicIcon'
import IconBtn from '@/components/ui/IconBtn'
import { Image } from 'expo-image'
import MessageInput from '@/components/ui/MessageInput' 
import { Message, User } from '../constants/types'
import MessageCard from '@/components/features/MessageCard'

const contactScreen = () => {

    // navigation
    const router = useRouter()

    // theme
    const colorScheme = useColorScheme()

    // retrieving the other user as well the chat id    
    const { chat_id, user } = useLocalSearchParams<{ chat_id: string, user: string }>()

    const parsedUser = JSON.parse(user)

    // temporary data
    const fakeMessages: Message[] = [
        {
            id: '12424234',
            chat_id: 'c50b4288-4838-418e-9527-e10bbbd0636c',
            sender_id: '33125fc3-85dd-4f6d-86a8-52b9aea41027',
            content: 'Lorem ipsum dolor sit amet consectetur',
            media_url: null,
            message_type: 'message',
            created_at: 'Sat 21 Nov 2026 14:06:28 GMT+0000'
        },
        {
            id: '12424235',
            chat_id: 'c50b4288-4838-418e-9527-e10bbbd0636c',
            sender_id: '860ba99a-5997-46f7-980b-6f823b0ac493',
            content: 'ipsum dolor sit, amet consectetur adipisicing elit. Commodi, modi aliquam perferendis eaque qui omnis porro',
            media_url: null,
            message_type: 'message',
            created_at: 'Sat 21 Nov 2026 14:06:28 GMT+0000'
        },
        {
            id: '12424236',
            chat_id: 'c50b4288-4838-418e-9527-e10bbbd0636c',
            sender_id: '33125fc3-85dd-4f6d-86a8-52b9aea41027',
            content: 'amet consectetur adipisicing elit. Commodi, modi aliquam perferendis eaque qui omnis',
            media_url: null,
            message_type: 'message',
            created_at: 'Sat 21 Nov 2026 14:06:28 GMT+0000'
        }
    ] 

    const [message_input, set_message_input] = useState<string>('')

    // user image at the top

    const [thumbnail_error, set_thumbnail_error] = useState(false)
    
    const imageSource = typeof parsedUser.avatar_url === 'string' 
        ? { uri: parsedUser.avatar_url } 
        : parsedUser.avatar_url


    const handle_send_message = (): void => {
        
    }

    return (
        <View
            className='flex flex-col w-full h-screen gap-0 bg-background dark:bg-dark_background'
        >
        
            {/* back btn, name and options */}
            <View
                className='flex flex-row items-center justify-between w-full h-auto p-4 px-7 pt-14 bg-primary dark:bg-dark_primary'
            >
                
                {/* back btn and user */}
                <View
                    className='flex flex-row w-auto h-auto gap-4'
                >
                    
                    {/* back btn */}
                    <IconBtn
                        name={'ArrowLeft'}
                        size={36}
                        strokeWidth={1.2}
                        onPress={() => router.back()}
                    />

                    {/* user */}
                    <View
                        className='flex flex-row items-center w-auto h-auto gap-3'
                    >
                        {
                            !thumbnail_error && Boolean(parsedUser.avatar_url)
                            ?   <Image
                                    source={imageSource}
                                    onError={() => set_thumbnail_error(true)}
                                    contentFit="cover"
                                    style={{ 
                                        width: 40, 
                                        height: 40, 
                                        borderRadius: 9999, 
                                        borderWidth: 1, 
                                        borderColor: '#eff6ff'
                                    }}
                                />
                            :   <View
                                    className='flex items-center justify-center border rounded-full border-primary dark:border-dark_primary size-[3.35rem] bg-white dark:bg-background/10'
                                >
                                    <DynamicIcon
                                        name={'User'}
                                        color={colorScheme === 'dark' ? '#eff6ff' : '#1e3a8a'}
                                        size={32}
                                        strokeWidth={1.2}
                                    />
                                </View>
                        }
                        <View
                            className='flex flex-col w-auto h-auto gap-0'
                        >
                            <Text
                                className='text-sm/tight text-background/80 font-poppins-light'
                            >
                                Handle:
                            </Text>
                            <Text
                                className='text-xl font-poppins-medium text-background'
                            >
                                {parsedUser.display_name}
                            </Text>    
                        </View>
                        
                    </View>

                </View>

                <IconBtn
                    name={'EllipsisVertical'}
                    size={24}
                    strokeWidth={2}
                    onPress={() => {}}
                />

            </View>

            {/* messages and message input */}
            <KeyboardAvoidingView
                className='relative w-full h-[85%]'
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
            >   
                <FlatList
                    data={fakeMessages}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <MessageCard
                            id={item.id}
                            chat_id={item.chat_id}
                            sender_id={item.sender_id}
                            content={item.content}
                            media_url={item.media_url}
                            message_type={item.message_type}
                            created_at={item.created_at}
                        />
                    )}
                />
                <MessageInput
                    value={message_input}
                    onChangeText={(text: string) => set_message_input(text)}
                    onPress={() => handle_send_message()}
                />
            </KeyboardAvoidingView>

        </View>
    )
}

export default contactScreen