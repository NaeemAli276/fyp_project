import { View, Text, useColorScheme } from 'react-native'
import React from 'react'
import IconBtn from '@/components/ui/IconBtn'
import { useRouter } from 'expo-router'
import SettingsBtn from '@/components/ui/SettingsBtn'

const settingsScreen = () => {
  
  const colorScheme = useColorScheme()

  const router = useRouter()

  return (
    <View
      className='p-8 rounded-[2xl] py-16 bg-background dark:bg-dark_background w-full h-screen flex flex-col gap-10'
    >

      {/* title and back btn */}
      <View
        className='flex flex-col w-full h-auto gap-6'
      >
        <IconBtn
          name={'ArrowLeft'}
          colour={colorScheme === 'dark' ? '#eff6ff' : '#1e3a8a'}
          size={32}
          strokeWidth={1.2}
          onPress={() => router.back()}
        />
        <Text
          className='text-3xl text-text dark:text-background font-poppins-semibold'
        >
          Settings
        </Text>
      </View>

      {/* options */}
      <View
        className='flex flex-col w-full h-auto gap-4'
      >
        
        {/* logout btn */}
        <SettingsBtn
          name='Logout'
          icon_name='LogOut'
        />

      </View>

    </View>
  )
}

export default settingsScreen