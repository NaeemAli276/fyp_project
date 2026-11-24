import { View, Text, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'expo-image'
import DynamicIcon from './DynamicIcon'

interface AvatarImageProps {
    avatar_url: string | null,
    size?: 'xs' | 'sm' | 'md' | 'lg'
}


const AvatarImage: React.FC<AvatarImageProps> = ({
    avatar_url,
    size = 'md'
}) => {

    const [thumbnail_error, set_thumbnail_error] = useState(false)

    const colorScheme = useColorScheme()

    const imageSource = typeof avatar_url === 'string' 
        ? { uri: avatar_url } 
        : avatar_url

    const valid_image_styles = {
        xs: {
            width: 28, 
            height: 28, 
            borderRadius: 9999, 
            borderWidth: 1, 
            borderColor: colorScheme === 'dark' ? '#5b98ff' : '#3b82f6'
        },
        sm: {
            width: 36, 
            height: 36, 
            borderRadius: 9999, 
            borderWidth: 1, 
            borderColor: colorScheme === 'dark' ? '#5b98ff' : '#3b82f6'
        },
        md: {
            width: 48, 
            height: 48, 
            borderRadius: 9999, 
            borderWidth: 1, 
            borderColor: colorScheme === 'dark' ? '#5b98ff' : '#3b82f6'
        },
        lg: {
            width: 56, 
            height: 56, 
            borderRadius: 9999, 
            borderWidth: 1, 
            borderColor: colorScheme === 'dark' ? '#5b98ff' : '#3b82f6'
        }
    }

    if (!thumbnail_error && Boolean(avatar_url)) {
        return (
            <Image
                source={imageSource}
                onError={() => set_thumbnail_error(true)}
                contentFit="cover"
                style={valid_image_styles[size]}
            />
        )
    }
    else {
        return (
            <View
                className='flex items-center justify-center border rounded-full border-primary dark:border-dark_primary size-[3.35rem] bg-white dark:bg-background/10'
            >
                <DynamicIcon
                    name={'User'}
                    color={colorScheme === 'dark' ? '#eff6ff' : '#1e3a8a'}
                    size={32}
                    strokeWidth={1.2}
                />
            </View>
        )
    }
}

export default AvatarImage