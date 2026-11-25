import { ActivityIndicator, FlatList, View, Text, TouchableOpacity, useColorScheme, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, usePathname, useRouter } from 'expo-router'
import DynamicIcon from '@/components/ui/DynamicIcon'
import IconBtn from '@/components/ui/IconBtn'
import { Image } from 'expo-image'
import MessageInput from '@/components/ui/MessageInput' 
import { Contact, Message, User } from '../constants/types'
import MessageCard from '@/components/features/MessageCard'
import { useAuthStore } from '@/stores/authStore'
import { supabase } from '@/lib/supbase'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

const contactScreen = () => {

    // navigation
    const router = useRouter()
    const pathname = usePathname()

    const { user } = useAuthStore()

    // theme
    const colorScheme = useColorScheme()

    // retrieving the other user as well the chat id    
    const { id, recipient } = useLocalSearchParams<{ id: string, recipient: string }>()

    const parsedUser: Contact = JSON.parse(recipient)

    // temporary data
    const fakeMessages: Message[] = [
        // {
        //     id: '12424234',
        //     chat_id: 'c50b4288-4838-418e-9527-e10bbbd0636c',
        //     sender_id: '33125fc3-85dd-4f6d-86a8-52b9aea41027',
        //     content: 'Lorem ipsum dolor sit amet consectetur',
        //     media_url: null,
        //     message_type: 'message',
        //     created_at: 'Sat 21 Nov 2026 14:06:28 GMT+0000'
        // },
        // {
        //     id: '12424235',
        //     chat_id: 'c50b4288-4838-418e-9527-e10bbbd0636c',
        //     sender_id: '860ba99a-5997-46f7-980b-6f823b0ac493',
        //     content: 'ipsum dolor sit, amet consectetur adipisicing elit. Commodi, modi aliquam perferendis eaque qui omnis porro',
        //     media_url: null,
        //     message_type: 'message',
        //     created_at: 'Sat 21 Nov 2026 14:06:28 GMT+0000'
        // },
        // {
        //     id: '12424236',
        //     chat_id: 'c50b4288-4838-418e-9527-e10bbbd0636c',
        //     sender_id: '33125fc3-85dd-4f6d-86a8-52b9aea41027',
        //     content: 'amet consectetur adipisicing elit. Commodi, modi aliquam perferendis eaque qui omnis',
        //     media_url: null,
        //     message_type: 'message',
        //     created_at: 'Sat 21 Nov 2026 09:12:28 GMT+0000'
        // }
    ] 

    const [message_input, set_message_input] = useState<string>('')

    // user image at the top

    const [thumbnail_error, set_thumbnail_error] = useState(false)
    
    const imageSource = typeof parsedUser.avatar_url === 'string' 
        ? { uri: parsedUser.avatar_url } 
        : parsedUser.avatar_url


    const handle_send_message = async (chat_id: string, sender_id: string, content: string): Promise<void> => {
        
        const { error } = await supabase.from('messages').insert({
            chat_id: chat_id,
            sender_id: sender_id,
            content: content,
            message_type: 'text'
        })
        if (error) {
            console.error(error)
        }

        set_message_input('')

    }

    const handle_retrieve_messages = async (): Promise<Message[]> => {
        
        const { data: messages, error } = await supabase
            .from('messages')
            .select('*')
            .eq('chat_id', id)
            .order('created_at', { ascending: true })

        if (error) {
            console.error(error)
            throw new Error(error.message)
        }
        
        return messages

    }

    const test_retrieve_messages = async () => {
        return fakeMessages
    }

    const { isFetching, error, data } = useQuery({
        queryKey: ['fetch_chat', id],
        // queryKey: ['fetch_chat'],
        queryFn: handle_retrieve_messages,
        // queryFn:  test_retrieve_messages ,
        initialData: [],
    })
    
    useEffect(() => {
        console.log('chat_id: ', id)
        // console.log('pathname: ', pathname)
    }, [])

    return (
        <View
            className='flex flex-col w-full h-screen gap-4 bg-background dark:bg-dark_background'
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

            {/* error state */}
            <View
                className={`w-full h-4/5 ${!isFetching && error !== null && data.length <= 0 ? 'flex' : 'hidden'} flex-col items-center justify-center gap-4`}
            >
                <View
                    className='relative w-auto h-auto'
                >
                    <DynamicIcon
                        name={'Server'}
                        size={80}
                        strokeWidth={1.2}
                        fill={colorScheme === 'dark' ? '#eff6ff' : '#1e3a8a'}
                        color={colorScheme === 'dark' ? '#eff6ff' : '#1e3a8a'}
                    >
                        <View
                            style={{
                                transform: [
                                { translateX: 4 * -3.5 },
                                { translateY: 4 * 7 }
                                ]
                            }}
                        >
                        <DynamicIcon
                            name={'Dot'}
                            color={colorScheme === 'dark' ? '#5b98ff' : '#eff6ff'}
                            size={64}
                        />
                        </View>
                        <View
                            style={{
                                transform: [
                                    { translateX: 4 * -3.5 },
                                    { translateY: 4 * -19 }
                                ]
                            }}
                        >
                            <DynamicIcon
                                name={'Dot'}
                                color={colorScheme === 'dark' ? '#5b98ff' : '#eff6ff'}
                                size={64}
                            />
                        </View>
                    </DynamicIcon>
                    <View
                        className='absolute p-1 rounded-full -right-0 top-14 bg-primary dark:bg-dark_primary'
                    >
                        <DynamicIcon
                            name='X'
                            color={'#eff6ff'}
                            strokeWidth={1.2}  
                            size={24}
                        />
                    </View>
                </View>
                
                {/* detail */}
                <View
                    className='flex flex-col items-center justify-center w-auto h-auto gap-0 pb-12'
                >
                    <Text
                        className='text-xl font-poppins-semibold text-text dark:text-background'
                    >
                        Error
                    </Text>
                    <Text
                        className='text-center px-14 text-text/80 dark:text-background/80 font-poppins-regular'
                    >
                        An error has occured, please restart the app
                    </Text>
                </View>
            </View>

            {/* messages and message input */}
            <KeyboardAvoidingView
                className={`relative w-full h-[85%] ${!isFetching && error === null && data.length > 0 ? 'flex' : 'hidden'}`}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
            >   
                
                {
                    isFetching
                    ?    <View
                            className={`flex flex-col items-center justify-center w-full h-3/4`}
                        >
                            <ActivityIndicator
                                size={'large'}
                                color={colorScheme === 'dark' ? '#5b98ff' : '#3b82f6'}
                            />      
                        </View>
                    :   <>
                            <FlatList
                                data={data}
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
                                        avatar_url={item.sender_id === user?.user_id ? user?.avatar_url : parsedUser?.avatar_url}
                                    />
                                )}
                                scrollEnabled
                                showsVerticalScrollIndicator
                                contentContainerClassName='flex flex-col gap-4 pb-24'
                            />
                            <MessageInput
                                value={message_input}
                                onChangeText={(text: string) => set_message_input(text)}
                                onPress={() => handle_send_message(id, `${user?.user_id}`, message_input)}
                            />
                        </>
                }
            </KeyboardAvoidingView>
                    
        </View>
    )
    
    
}

export default contactScreen