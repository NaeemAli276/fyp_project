import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import DynamicIcon from '@/components/ui/DynamicIcon'
import SplashScreenBtn from '@/components/ui/SplashScreenBtn'
import { useNavigation } from 'expo-router'
import { NativeStackNavigationProp } from 'expo-router'
import { RootStackParamList } from '@/constants/types' 

const splashScreen = () => {
  
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  return (
    <SafeAreaView
      className='relative flex items-center justify-center w-full h-screen p-8 py-6 bg-background dark:bg-dark_background rounded-[2rem]'
    >
      
      <View
        className='absolute flex flex-row items-center justify-center w-full h-auto gap-3 pb-12'
      >
        {/* light icon */}
        <View
          className='flex dark:hidden'
        >
          <DynamicIcon
            name='Box'
            size={36}
            strokeWidth={1.5}
            color={'#3b82f6'}
          />  
        </View>

        {/* dark icon */}
        <View
          className='hidden dark:flex'
        >
          <DynamicIcon
            name='Box'
            size={36}
            strokeWidth={1.5}
            color={'#5b98ff'}
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
        <SplashScreenBtn
          ftn={() => nav.navigate('registerScreen')}
          name='Register'
        />
        <SplashScreenBtn
          ftn={() => nav.navigate('loginScreen')}
          name='Login'
        />
      </View>

    </SafeAreaView>
  )
}

export default splashScreen