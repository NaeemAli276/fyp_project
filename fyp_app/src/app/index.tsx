import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Redirect } from 'expo-router'
import { useAuthStore } from '@/stores/authStore'
import { SafeAreaView } from 'react-native-safe-area-context'
import IconBtn from '@/components/ui/IconBtn'
import { useQuery } from '@tanstack/react-query' 
import SearchBar from '@/components/ui/SearchBar'


const ContactListScreen = () => {
  
  const { isAuthenticated } = useAuthStore()

  const [search_query, set_search_query] = useState<string>('')

  const { isLoading, error, data } = useQuery({
    queryKey: ['load_messages'],
    queryFn: () => { return [] }
  })

  if (!isAuthenticated) {
    return (
      <Redirect href={'/splashScreen'}/>
    )
  }
  if (!isLoading) {
    return (
      <View
        className='relative w-full h-screen bg-background dark:bg-dark_background'
      > 

        {/* title, setting btn, search bar*/}
        <View
          className='bg-primary dark:bg-dark_primary rounded-b-[2rem] flex flex-col gap-0 h-64 pt-8'
        >
          
          {/* title and menu btn */}
          <View
            className='flex flex-row items-center justify-between w-full h-auto p-8 pt-6 pr-7'
          >
            <Text
              className='text-2xl text-background font-poppins-semibold '
            >
              Contacts
            </Text>

            <IconBtn
              name={'Settings'}
              onPress={() => {}}
              size={24}
              strokeWidth={1.2}
            />
          </View>

          {/* search bar */}
          <View
            className='px-8'
          >
            <SearchBar
              onChangeText={(text) => set_search_query(text)}
              value={search_query}
            />
          </View>

        </View>

      </View>
    )
  }
  else {
    return (
      <SafeAreaView
        className='w-full h-screen bg-background dark:bg-dark_background'
      >

        {/* title and menu btn */}
        <View
          className='flex flex-row items-center justify-between w-full h-auto p-8 pt-6 pr-7'
        >
          <Text
            className='text-2xl text-text dark:text-background font-poppins-semibold '
          >
            Contacts
          </Text>

          <IconBtn
            name={'Settings'}
            onPress={() => {}}
            size={24}
            strokeWidth={1.2}
          />

        </View>

      </SafeAreaView>
    )
  }

  

}

export default ContactListScreen