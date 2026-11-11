import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import DynamicIcon  from '../components/ui/DynamicIcon'
import { useNavigation } from 'expo-router'
import { NativeStackNavigationProp } from 'expo-router' 
import { RootStackParamList } from '@/constants/types' 
import CustomTextInput from '@/components/ui/CustomTextInput'

const loginScreen = () => {
  
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const [form_fields, set_form_fields] = useState<Object>({
    handle: '',
    password: '',
    remember_me: false
  })

  const handle_change_text_fields = (text: string, current_field: string): void => {
    
    

  }

  return (
    <SafeAreaView
      className='w-full h-screen bg-primary dark:bg-dark_primary'
    >

      {/* go back btn */}
      <View
        className='w-auto h-auto p-8 pt-4 pb-32'
      >
        <TouchableOpacity
          onPress={() => nav.goBack()}
        >
          <DynamicIcon
            name='ArrowLeft'
            size={36}
            strokeWidth={1.2}
            color={'#ffffff'}
          />
        </TouchableOpacity>
      </View>

      {/* main content */}
      <View
        className='w-full h-full rounded-t-[2rem] bg-background dark:bg-dark_background p-8 py-6 flex flex-col gap-20'
      >
        
        {/* title */}
        <View
          className='flex flex-col w-full h-auto gap-2'
        >
          <Text
            className='text-3xl text-text dark:text-background font-poppins-semibold'
          >
            Welcome Back
          </Text>
          <Text
            className='text-text/80 dark:text-background/80 font-poppins-regular'
          >
            Sign into you account to gain access to your contacts
          </Text>
        </View>

        {/* input fields */}
        <View
          className='flex flex-col w-full h-auto gap-2'
        >
          
          {/* handle */}
          <CustomTextInput
            name='handle'
            placeholder='Enter your handle...'
            
          />

          
        </View>

      </View>

    </SafeAreaView>
  )
}

export default loginScreen