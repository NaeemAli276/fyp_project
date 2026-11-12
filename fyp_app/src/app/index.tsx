import { View, Text } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'
import { useAuthStore } from '@/stores/authStore'
import { SafeAreaView } from 'react-native-safe-area-context'
import IconBtn from '@/components/ui/IconBtn'
import { useQuery } from '@tanstack/react-query' 

const ContactListScreen = () => {
  
  const { isAuthenticated } = useAuthStore()

  const { isLoading, error, data } = useQuery({
    queryKey: ['load_messages'],
    queryFn: () => {}
  })

  if (!isAuthenticated) {
    return (
      <Redirect href={'/splashScreen'}/>
    )
  }
  if (!isLoading) {
    return (
      <SafeAreaView
        className='w-full h-screen bg-background dark:bg-dark_background'
      > 
        
        {/* title and setting btn */}
        <View
          className='bg-primary dark:bg-dark_primary rounded-b-[2rem] flex flex-col gap-10 h-52'
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

          {/* search bar */}
          

        </View>

      </SafeAreaView>
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