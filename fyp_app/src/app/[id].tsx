import { View, Text, TouchableOpacity, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import DynamicIcon from '@/components/ui/DynamicIcon'
import IconBtn from '@/components/ui/IconBtn'
import { Image } from 'expo-image'
import MessageInput from '@/components/ui/MessageInput' 

const contactScreen = () => {

    const router = useRouter()

    const colorScheme = useColorScheme()

    const user = {
        id: '1232',
        display_name: 'John Doe',
        avatar_url: 'https://picsum.photos/seed/v/200/200'
    }

    const [thumbnail_error, set_thumbnail_error] = useState(false)
    
    const imageSource = typeof user.avatar_url === 'string' 
        ? { uri: user.avatar_url } 
        : user.avatar_url


    return (
        <View
            className='relative flex flex-col w-full h-screen gap-4 bg-background dark:bg-dark_background'
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
                            !thumbnail_error && Boolean(user.avatar_url)
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
                        <Text
                            className='pb-0.5 text-xl font-poppins-medium text-background'
                        >
                            {user.display_name}
                        </Text>
                    </View>

                </View>

                <IconBtn
                    name={'EllipsisVertical'}
                    size={24}
                    strokeWidth={2}
                    onPress={() => {}}
                />

            </View>

            <MessageInput/>

        </View>
    )
}

export default contactScreen