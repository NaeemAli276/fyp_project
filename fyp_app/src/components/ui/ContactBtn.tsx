import { View, Text, useColorScheme, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'expo-image' 
import DynamicIcon from './DynamicIcon'

interface ContactBtnProps {
    id: string
    name: string
    avatar_url: string | any,
    onPress: () => void
}

const ContactBtn: React.FC<ContactBtnProps> = ({
    name,
    avatar_url,
    onPress
}) => {

    const colorScheme = useColorScheme()

    const [thumbnail_error, set_thumbnail_error] = useState(false)
        
    const imageSource = typeof avatar_url === 'string' 
        ? { uri: avatar_url } 
        : avatar_url

    return (
        <TouchableOpacity
            className='flex flex-row items-center justify-between w-full h-auto gap-2 p-5 px-8'
            onPress={onPress}
        >
            <View
                className='flex flex-row items-start justify-start w-4/5 h-auto gap-3'
            >
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
                <View
                    className='flex flex-col w-auto h-auto gap-0'
                >
                    <Text
                        className='text-sm text-text/80 dark:text-background/80 font-poppins-regular'
                    >
                        Handle:
                    </Text>
                    <Text
                        className='text-xl text-text dark:text-background font-poppins-medium'
                    >
                        {name}
                    </Text>
                </View>
            </View>
            <DynamicIcon
                name='ChevronRight'
                strokeWidth={1.2}
                size={24}
                color={
                    colorScheme === 'dark' ? '#eff6ff' : '#1e3a8a'
                }
            />
        </TouchableOpacity>
    )
}

export default ContactBtn