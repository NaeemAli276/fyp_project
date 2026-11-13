import { View, Text, useColorScheme, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import { Redirect } from 'expo-router'
import { useAuthStore } from '@/stores/authStore'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useQuery } from '@tanstack/react-query' 
import { User } from '@/constants/types'
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import TopBar from '@/components/features/TopBar'
import DynamicIcon from '@/components/ui/DynamicIcon'

interface Contacts extends User {
  recent_message: string
}

const ContactListScreen = () => {
  
  const colorScheme = useColorScheme()

  const action_sheet_ref = useRef<ActionSheetRef>(null)

  const { isAuthenticated } = useAuthStore()

  const [search_query, set_search_query] = useState<string>('')

  const [contacts, set_contacts] = useState<Contacts[]>([
    {
      id: '1',
      display_name: 'John Doe',
      recent_message: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis eius similique nulla'
    },
    {
      id: '2',
      display_name: 'Jane Doe',
      recent_message: 'earum voluptatum officiis commodi. Magni sapiente corrupti blanditiis debitis obcaecati facere mollitia ipsum ut dolorem autem.'
    },
    {
      id: '3',
      display_name: 'Bob Joe',
      recent_message: 'Magni sapiente corrupti blanditiis debitis obcaecati facere mollitia ipsum ut dolorem autem.'
    },

  ])

  const { isLoading, error, data } = useQuery({
    queryKey: ['load_messages'],
    queryFn: () => { return [] },
    initialData: []
  })

  const openNewContactDrawer = (): void => {
    action_sheet_ref.current?.show()
  }

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
                No messages
              </Text>
              <Text
                className='text-center text-text/80 dark:text-background/80 font-poppins-regular'
              >
                You currently have no contacts
              </Text>
            </View>

          </View>

          {/*  */}

          
        </View>

        <TouchableOpacity
          className='absolute p-2 rounded-md bottom-12 right-8 bg-primary dark:bg-dark_primary'
          onPress={() => openNewContactDrawer()}
        >
          <DynamicIcon
            name='UserRoundPlus'
            size={36}
            strokeWidth={1.5}
            color={'#eff6ff'}
          />
        </TouchableOpacity>
        <ActionSheet
          ref={action_sheet_ref}
          containerStyle={{ 
            height: 4 * 56,
            backgroundColor: colorScheme === 'dark' ? '#111827' : '#eff6ff',
          }}
        >
          <View
            className='w-full h-56'
          >
            
          </View>
        </ActionSheet>
      </View>
    )
  }

  

}

export default ContactListScreen