import { View, Text, useColorScheme } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import DynamicIcon from '@/components/ui/DynamicIcon'
import { Redirect, useRouter } from 'expo-router'
import { useAuthStore } from '@/stores/authStore'
import GreetingBtn from '@/components/ui/GreetingBtn'

const greetingScreen = () => {
  
  const colorScheme = useColorScheme()

  const router = useRouter()

  const { isAuthenticated } = useAuthStore()

  if (isAuthenticated) {
    return <Redirect href={'/'}/>
  }
  else {
    return (
      <SafeAreaView
        className='relative flex items-center justify-center w-full h-screen p-8 py-6 bg-background dark:bg-dark_background'
      >
        
        <View
          className='absolute flex flex-row items-center justify-center w-full h-auto gap-3 pb-12'
        >
          {/* icon */}
          <View
            className='flex'
          >
            <DynamicIcon
              name='Vault'
              size={36}
              strokeWidth={1.5}
              color={
                colorScheme === 'dark' 
                ?   '#5b98ff'
                :   '#3b82f6'
              }
            />  
          </View>
          
          {/* title */}
          <Text
            // style={{ fontFamily: "Poppins-Regular" }}
            className='text-3xl font-poppins-bold dark:text-background text-text'
          >
            Cypher
          </Text>

        </View>

        {/* login and sign in btns */}
        <View
          className='flex flex-col justify-end w-full h-full gap-4'
        >
          <GreetingBtn
            ftn={() => router.navigate('/registerScreen')}
            name='Register'
          />
          <GreetingBtn
            ftn={() => router.navigate('/loginScreen')}
            name='Login'
          />
        </View>

      </SafeAreaView>
    )
  }
  
}

export default greetingScreen