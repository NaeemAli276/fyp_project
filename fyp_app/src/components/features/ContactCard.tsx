import { View, Text, TouchableOpacity, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import { Contact } from '@/constants/types'
import { truncateText } from '@/utils/stringUtils'
import { useRouter } from 'expo-router'
import DynamicIcon from '../ui/DynamicIcon'
import { Image } from 'expo-image'

const ContactCard: React.FC<Contact> = ({
    user_id,
    display_name,
    // recent_message = null,
    // time,
    avatar_url,
    chat_id
}) => {
    const router = useRouter()
    const colorScheme = useColorScheme()

    const [thumbnail_error, set_thumbnail_error] = useState(false)
    
    const imageSource = typeof avatar_url === 'string' 
        ? { uri: avatar_url } 
        : avatar_url

    return (
        <TouchableOpacity
            className='flex flex-row w-full h-[72px] p-3 px-8 items-center'
            onPress={() => router.push({
                pathname: '/[id]',
                params: { 
                    id: chat_id, 
                    user: JSON.stringify({
                        id: user_id,
                        display_name: display_name,
                        avatar_url: avatar_url
                    }) 
                }
            })}
        >
            {/* avatar_url, name and message truncated */}
            <View className='flex flex-row items-center w-4/5 gap-3'>
                {
                    !thumbnail_error && Boolean(avatar_url)
                    ?   <Image
                            source={imageSource}
                            onError={() => set_thumbnail_error(true)}
                            contentFit="cover"
                            style={{ 
                                width: 48, 
                                height: 48, 
                                borderRadius: 9999, 
                                borderWidth: 1, 
                                borderColor: colorScheme === 'dark' ? '#5b98ff' : '#3b82f6'
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
                <View className='flex flex-col w-full h-full gap-0'>
                    <Text
                        className='text-sm/tight font-poppins-regular text-text/80 dark:text-background/80'
                    >
                        Handle:
                    </Text>
                    <Text className='text-lg font-poppins-medium text-text dark:text-background'>
                        {display_name}
                    </Text>
                    {/* <Text
                        className='text-sm font-poppins-light text-text/90 dark:text-background/80'
                        numberOfLines={1}
                    >
                        {
                            recent_message !== null
                            ?   truncateText(recent_message, 30)
                            :   'No message'
                        }
                    </Text> */}
                </View>
            </View>
            
            {/* time and notifications */}
            <View className='flex flex-col items-end w-1/5 h-full gap-1'>
                {/* <Text className='text-sm font-poppins-light text-text/90 dark:text-background/90'>
                    {time}
                </Text> */}
            </View>
        </TouchableOpacity>
    )
}

export default ContactCard
