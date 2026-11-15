import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Contact, RootStackParamList } from '@/constants/types'
import { truncateText } from '@/utils/stringUtils'
import { useRouter } from 'expo-router'

const ContactCard: React.FC<Contact> = ({
    id,
    display_name,
    recent_message,
    time
}) => {

    const router = useRouter()

    return (
        <TouchableOpacity
            className='flex flex-row w-full h-[72px] p-3 px-8'
            onPress={() => router.push({
                pathname: '/[id]',
                params: { id: id }
            })}
        >
            
            {/* name and message truncated */}
            <View
                className='flex flex-col w-4/5 h-full gap-0'                
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
                    {truncateText(recent_message, 40)}
                </Text>
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