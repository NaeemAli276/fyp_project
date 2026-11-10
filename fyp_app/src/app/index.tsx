import { View, Text } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'
import { useAuthStore } from '@/stores/authStore'
import { SafeAreaView } from 'react-native-safe-area-context'

const index = () => {
  
  const { user } = useAuthStore()

  if (!user) {
    return (
      <Redirect href={'/splashScreen'}/>
    )
  }
  else {
    return (
      <SafeAreaView></SafeAreaView>
    )
  }

  

}

export default index