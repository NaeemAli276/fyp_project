import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

interface LongBtnProps {
    name: string
    onPress: () => void
}

const LongBtn: React.FC<LongBtnProps> = ({
    name,
    onPress
}) => {
    return (
        <TouchableOpacity
            className='w-full h-auto p-3 rounded-lg bg-primary dark:bg-primary'
            onPress={onPress}
        >
            <Text
                className='text-xl text-center font-poppins-semibold text-background'
            >
                {name}
            </Text>
        </TouchableOpacity>
    )
}

export default LongBtn