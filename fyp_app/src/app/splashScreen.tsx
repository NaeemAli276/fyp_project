import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import DynamicIcon from '@/components/ui/DynamicIcon'

const splashScreen = () => {
  return (
    <SafeAreaView
      className='relative w-full h-screen p-8 py-6 bg-background dark:bg-dark_background'
    >
      
      <View
        className='absolute flex flex-row items-center w-full h-auto gap-3 top-1/2 left-1/2'
      >
        {/* light icon */}
        <View
          className='flex dark:hidden'
        >
          <DynamicIcon
            name='Box'
            size={36}
            strokeWidth={1.2}
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
            strokeWidth={1.2}
            color={'#5b98ff'}
          />  
        </View>
        
        {/* title */}
        <Text
          className='text-2xl font-bold'
        >
          Cypher
        </Text>

      </View>

    </SafeAreaView>
  )
}

export default splashScreen