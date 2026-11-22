import { View, Text, useColorScheme } from 'react-native'
import React from 'react'
import DynamicIcon from '@/components/ui/DynamicIcon'

const splashScreen = () => {
    
    const colorScheme = useColorScheme()
    
    return (
        <View
            className='flex items-center justify-center w-full h-screen bg-background dark:bg-dark_background'
        >
            {/* icon */}
            <View
                className='flex dark:hidden'
            >
                <DynamicIcon
                    name='Box'
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
    )
}

export default splashScreen