import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import DynamicIcon  from '../components/ui/DynamicIcon'
import { Link, useRouter } from 'expo-router'
import { NativeStackNavigationProp } from 'expo-router' 
import { RootStackParamList } from '@/constants/types' 
import CustomTextInput from '@/components/ui/CustomTextInput'
import { useColorScheme } from 'react-native' 
import CustomCheckbox from '@/components/ui/CustomCheckbox'
import LongBtn from '@/components/ui/LongBtn'
import { useAuthStore } from '@/stores/authStore'

type form_fields = {
  email: string
  handle: string
  password: string,
  remember_me: boolean
}

const registerScreen = () => {
  
  const colorScheme = useColorScheme()
  
  const { register, isAuthenticated } = useAuthStore()

  const router = useRouter()

  const [show_password, set_show_password] = useState<boolean>(false)

  const [form_fields, set_form_fields] = useState<form_fields>({
    email: '',
    handle: '',
    password: '',
    remember_me: false
  })

  const [error, set_error] = useState<string>('')

  const handle_change_text_fields = (text: string, current_field: string): void => {
    
    set_form_fields({
      ...form_fields,
      [current_field]: text
    })

  }

  const handle_register = async (): Promise<void> => {
    
    try {
      set_error('')
      await register(form_fields.email, form_fields.password ,form_fields.handle)
    }
    catch (error: any) {
      set_error(error.message)   
      Alert.alert(error.message)   
    }

    console.log("this is clicked")

  }
  
  return (
    <SafeAreaView
      className='w-full h-screen bg-primary dark:bg-dark_primary'
    >

      {/* go back btn */}
      <View
        className='w-auto h-auto p-8 pt-4 pb-24'
      >
        <Link
          href={'/splashScreen'}
        >
          <DynamicIcon
            name='ArrowLeft'
            size={36}
            strokeWidth={1.2}
            color={'#ffffff'}
          />
        </Link>
      </View>

      {/* main content */}
      <View
        className='w-full h-full rounded-t-[2rem] bg-background dark:bg-dark_background p-8 py-6 flex flex-col gap-10'
      >
        
        {/* title */}
        <View
          className='flex flex-col w-full h-auto gap-2'
        >
          <Text
            className='text-3xl text-text dark:text-background font-poppins-semibold'
          >
            Welcome to Cypher
          </Text>
          <Text
            className=' text-text/80 dark:text-background/80 font-poppins-regular'
          >
            Enter you details to start talking to other users.
          </Text>
        </View>

        {/* input fields */}
        <View
          className='flex flex-col w-full h-auto gap-7'
        >
        
          {/* email */}
          <CustomTextInput
            name='Email'
            placeholder='Enter your email...'
            onPress={() => set_error('')}
            type='text'
            value={form_fields.email}
            onChangeText={(text: string) => handle_change_text_fields(text, 'email')}
          />

          {/* handle */}
          <CustomTextInput
            name='Handle'
            placeholder='Enter your handle...'
            onPress={() => set_error('')}
            type='text'
            value={form_fields.handle}
            onChangeText={(text: string) => handle_change_text_fields(text, 'handle')}
          />

          {/* password */}
          <View
            className='relative w-full h-auto'
          > 
            <CustomTextInput
              name='Password'
              placeholder='Enter your password...'
              onPress={() => set_error('')}
              type={show_password ? 'text' : 'password'}
              value={form_fields.password}
              onChangeText={(text: string) => handle_change_text_fields(text, 'password')}
            />
            <TouchableOpacity
              className='absolute p-1 top-3.5 right-3'
              onPress={() => set_show_password(!show_password)}
            >
              <DynamicIcon
                name={show_password ? 'Eye' : 'EyeOff'}
                size={24}
                strokeWidth={0.8}
                color={colorScheme === 'dark' ? '#eff6ff' : '#172554'}
              />
            </TouchableOpacity>
          </View>

          {/* remember_me btn */}
          <CustomCheckbox
            name='Remember me'
            onPress={() => set_form_fields({...form_fields, remember_me: !form_fields.remember_me})}
            is_active={form_fields.remember_me}
          />

        </View>

        {/* register btn and redirect btn */}
        <View
          className='flex flex-col w-full gap-5 h-1/4'
        >

          {/* error text */}
          <Text
            className={`text-center text-sm text-rose-500 font-poppins-regular`}
          >
            {error}
          </Text>

          <LongBtn
            name='Register'
            onPress={() => handle_register()}
          />

          {/* register redirect btn */}
          <Link
            href={'/registerScreen'}
          >
            <Text
              className='text-center text-text/80 dark:text-background/80 font-poppins-regular'
            >
              Don't have an account? <Text className='text-primary dark:text-dark_primary'>Sign up</Text>
            </Text>
          </Link>

        </View>
      </View>

    </SafeAreaView>
  )
}

export default registerScreen