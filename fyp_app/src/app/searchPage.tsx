import { View, Text, useColorScheme, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchBar from '@/components/ui/SearchBar'
import { useRouter } from 'expo-router'
import IconBtn from '@/components/ui/IconBtn'
import { supabase } from '@/lib/supbase' 
import { useDebounce } from '@uidotdev/usehooks'
import { Profile } from '@/constants/types'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { ActivityIndicator } from 'react-native'
import DynamicIcon from '@/components/ui/DynamicIcon'
import ContactBtn from '@/components/ui/ContactBtn'
import { useAuthStore } from '@/stores/authStore'
import { public_profile } from '@/constants/types'

const searchPage = () => {

    const router = useRouter()

    const { user } = useAuthStore()
    
    const [search_query, set_search_query] = useState<string>('')

    const debounced_term = useDebounce(search_query, 500)

    const colorScheme = useColorScheme()

    const fetchUsers = async (): Promise<public_profile[]> => {
        
        let { data, error } = await supabase
            .from('profiles')
            .select('id, display_name, avatar_url')
            .like('display_name', `%${debounced_term}%`)
            .neq('id', user?.user_id ?? '')   // exclude yourself
            .limit(10)


        if (error) {
            console.log(error)
            throw new Error(error.message)
        }
        
        console.log(data)
        return data ?? []

    }

    const create_chat = async (otherUserId: string) => {

        const { data: chatId, error } = await supabase.rpc('create_direct_chat', {
            other_user_id: otherUserId,
        })
        if (error) throw new Error(error.message)
        router.back()
    }

    const { isLoading, error, data } = useQuery({
        queryFn: fetchUsers,
        queryKey: ['fetch_users', debounced_term],
        initialData: [],
        // placeholderData: keepPreviousData,
        enabled: debounced_term !== ''
    })

    return (     
        <View
            className='flex flex-col w-full h-screen gap-4 bg-background dark:bg-dark_background'
        >
            
            {/* search input and title */}
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
        
            {/* loading state */}
            <View
                className={`${isLoading && debounced_term !== '' ? 'flex' : 'hidden'} items-center justify-center w-full h-1/2`}
            >
                <ActivityIndicator
                    size={'large'}
                    color={colorScheme === 'dark' ? '#5b98ff' : '#3b82f6'}
                />      
            </View>

            {/* error state */}
            <View
                className={`w-full h-3/5 ${!isLoading && error !== null && debounced_term !== '' ? 'flex' : 'hidden'} flex-col items-center justify-center gap-4`}
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

            {/* empty query */}
            <View
                className={`w-full h-3/5 ${!isLoading && error === null && debounced_term === '' ? 'flex' : 'hidden'} flex-col items-center justify-center gap-4`}
            >
                <View
                    className='relative w-auto h-auto'
                >
                    <DynamicIcon
                        name={'Search'}
                        size={80}
                        // strokeWidth={1.2}
                        fill={colorScheme === 'dark' ? '#eff6ff' : '#1e3a8a'}
                        color={colorScheme === 'dark' ? '#eff6ff' : '#1e3a8a'}
                    >
                        <View
                            style={{
                                transform: [
                                    { translateX: 4 * 4.25 },
                                    { translateY: 4 * 4 }
                                ]
                            }}
                        >
                            <DynamicIcon
                                name='X'
                                size={40}
                                color={colorScheme === 'dark' ? '#1e3a8a' : '#eff6ff'}
                            />
                        </View>
                    </DynamicIcon>
                </View>

                {/* detail */}
                <View
                    className='flex flex-col items-center justify-center w-auto h-auto gap-0 pb-12'
                >
                    <Text
                        className='text-xl font-poppins-semibold text-text dark:text-background'
                    >
                        Empty query
                    </Text>
                    <Text
                        className='text-center px-14 text-text/80 dark:text-background/80 font-poppins-regular'
                    >
                        Type in a user's display name to find their profile
                    </Text>
                </View>
            </View>

            {/* search contacts */}
            <View
                className='w-full h-full'
            >
                <FlatList
                    keyExtractor={(item) => item.id}
                    data={data}
                    renderItem={({item}) => (
                        <ContactBtn
                            name={item.display_name}
                            id={item.id}
                            avatar_url={item.avatar_url}
                            onPress={() => create_chat(item.id)}
                        />
                    )}
                />
            </View>

        </View>
    )
}

export default searchPage