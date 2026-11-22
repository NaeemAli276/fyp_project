import { FlatList, View, Text, useColorScheme, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Redirect } from 'expo-router'
import { useAuthStore } from '@/stores/authStore'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useQuery } from '@tanstack/react-query' 
import { Contact } from '@/constants/types'
import TopBar from '@/components/features/TopBar'
import DynamicIcon from '@/components/ui/DynamicIcon'
import VerboseBtn from '@/components/ui/VerboseBtn'
import ContactCard from '@/components/features/ContactCard'
import { supabase } from '@/lib/supbase'

const ContactListScreen = () => {
  
  const colorScheme = useColorScheme()

  const { isAuthenticated, user } = useAuthStore()

  const [search_query, set_search_query] = useState<string>('')

  const fetch_chats = async (): Promise<Contact[]> => {
    
    const { data, error } = await supabase.rpc('get_my_direct_contacts')

    if (error) {
      console.error(error.message)
      throw new Error(error.message)
    }
    else {
      return data
    }

  }

  const { isLoading, error, data } = useQuery({
    queryKey: ['load_messages'],
    queryFn: fetch_chats,
    initialData: []
  })

  if (!isAuthenticated) {
    return (
      <Redirect href={'/splashScreen'}/>
    )
  }
  else {
    return (
      <View
        className='relative w-full h-screen bg-background dark:bg-dark_background'
      > 

        <TopBar
          search_query={search_query}
          handleChangeText={(text: string) => set_search_query(text)}
          clearText={() => set_search_query('')}
        />

        {/* main content */}
        <View
          className='flex items-center justify-center w-full h-3/4'
        >

          
          {/* spinner for loading state */}
          <View
            className={`w-auto h-auto ${isLoading ? 'flex' : 'hidden'}`}
          >
            <ActivityIndicator
              size={'large'}
              color={colorScheme === 'dark' ? '#5b98ff' : '#3b82f6'}
            />            
          </View>

          {/* empty state */}
          <View
            className={`w-full h-full ${!isLoading && error === null && data?.length <= 0 ? 'flex' : 'hidden'} flex-col items-center justify-center gap-4`}
          > 
            
            {/* icon */}
            <View
              className='relative w-auto h-auto'
            >
              <DynamicIcon
                name='MessageSquare'
                color={colorScheme === 'dark' ? '#eff6ff' : '#1e3a8a'}
                fill={colorScheme === 'dark' ? '#eff6ff' : '#1e3a8a'}
                size={80}
                strokeWidth={1.2}
              />
              <View
                className='absolute p-1 rounded-full -right-1 top-12 bg-primary dark:bg-dark_primary'
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
                No contacts
              </Text>
              <Text
                className='text-center text-text/80 dark:text-background/80 font-poppins-regular'
              >
                You currently have no contacts
              </Text>
            </View>

          </View>

          {/* error state */}
          <View
            className={`w-full h-full ${!isLoading && error !== null ? 'flex' : 'hidden'} flex-col items-center justify-center gap-4`}
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
                An error has occured, please reload the app
              </Text>
            </View>
          </View>

          {/* normal state */}
          <View
            className={`${!isLoading && error === null && data.length > 0 ? 'flex' : 'hidden'} flex-col w-full h-full pt-5`}
          >
            <FlatList
              data={data}
              renderItem={({ item }) => (
                <ContactCard
                  // recent_message={item.recent_message}
                  display_name={item.display_name}
                  user_id={item.user_id}
                  // time={item.time}
                  avatar_url={item.avatar_url}
                  chat_id={item.chat_id}
                />
              )}
              keyExtractor={(item) => item.user_id}
              className='flex flex-col gap-2'
            />
          </View>

        </View>

      </View>
    )
  }

  

}

export default ContactListScreen