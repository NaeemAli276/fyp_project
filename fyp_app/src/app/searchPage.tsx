import { View, Text, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchBar from '@/components/ui/SearchBar'
import { useRoute, useRouter } from 'expo-router'
import IconBtn from '@/components/ui/IconBtn'

const searchPage = () => {

    const router = useRouter()

    const [search_query, set_search_query] = useState<string>('')

    const colorScheme = useColorScheme()

    return (     
        <View
            className='flex flex-col w-full h-screen gap-8 bg-background dark:bg-dark_background'
        >
            
            <View
                className='flex flex-col w-full h-auto gap-10 p-8 pt-12 bg-primary dark:bg-dark_primary rounded-[2rem]'
            >
                {/* back btn */}
                <IconBtn
                    name={'ArrowLeft'}
                    onPress={() => router.back()}
                    colour={'#eff6ff'}
                    size={32}
                    strokeWidth={1.2}
                />                

                <View
                    className='flex flex-col w-full h-auto gap-3'
                >
                    {/* title */}
                    <Text
                        className='text-3xl text-background font-poppins-semibold'
                    >
                        Search users
                    </Text>
                    <SearchBar
                        value={search_query}
                        onChangeText={(text: string) => set_search_query(text)}
                        clearText={() => set_search_query('')}
                        background_type='transparent'
                        placeholder={"Enter a user's handle..."}
                    />
                </View>
        
            </View>
        
        </View>
    )
}

export default searchPage