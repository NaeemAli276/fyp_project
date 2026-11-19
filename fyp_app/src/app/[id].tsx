import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import DynamicIcon from '@/components/ui/DynamicIcon'

const contactScreen = () => {

    const router = useRouter()

    return (
        <View
            className='flex items-center justify-center w-full h-screen p-8'
        >
            <TouchableOpacity
                onPress={() => router.navigate('/')}
            >
                <DynamicIcon
                    name='ArrowLeft'
                />
            </TouchableOpacity>
            <Text>contactScreen</Text>
        </View>
    )
}

export default contactScreen