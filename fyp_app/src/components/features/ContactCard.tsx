import { View, Text, TouchableOpacity, Image, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import { Contact, RootStackParamList } from '@/constants/types'
import { truncateText } from '@/utils/stringUtils'
import { useRouter } from 'expo-router'
import DynamicIcon from '../ui/DynamicIcon'

const ContactCard: React.FC<Contact> = ({
    id,
    display_name,
    recent_message,
    time,
    avatar_url
}) => {

    const router = useRouter()
    const colorScheme = useColorScheme()

    const [thumbnail_error, set_thumbnail_error] = useState(false)
    const imageSource = typeof avatar_url === 'string' 
        ? { uri: avatar_url }       // Network image object
        : avatar_url

    const handle_image_error = (): void => {
        set_thumbnail_error(true)
    }

    return (
        <TouchableOpacity
            className='flex flex-row w-full h-[72px] p-3 px-8'
            onPress={() => router.push({
                pathname: '/[id]',
                params: { id: id }
            })}
        >
            
            {/* avatar_url, name and message truncated */}
            <View
                className='flex flex-row items-center w-4/5 gap-3'
            >
                {
                    !thumbnail_error && avatar_url === null
                    ?   <View
                            className='flex items-center justify-center border rounded-full border-text dark:border-background size-[3.35rem]'
                        >
                            <DynamicIcon
                                name={'User'}
                                color={colorScheme === 'dark' ? '#eff6ff' : '#1e3a8a'}
                                size={32}
                                strokeWidth={1.2}
                            />
                        </View>
                    :   <Image
                            source={imageSource}
                            onError={() => handle_image_error()}
                            className='rounded-full aspect-square size-14'
                        />
                }
                <View
                    className='flex flex-col w-full h-full gap-0'                
                >
                    <Text
                        className='text-lg font-poppins-medium text-text dark:text-background'
                    >
                        {display_name}
                    </Text>
                    <Text
                        className='text-sm font-poppins-light text-text/90 dark:text-background/80'
                        numberOfLines={1}
                    >
                        {truncateText(recent_message, 30)}
                    </Text>
                </View>
            </View>
            
            {/* time and notifications */}
            <View
                className='flex flex-col items-end w-1/5 h-full gap-1'
            >
                <Text
                    className='text-sm font-poppins-light text-text/90 dark:text-background/90'
                >
                    {time}
                </Text>
            </View>

        </TouchableOpacity>
    )
}

export default ContactCard