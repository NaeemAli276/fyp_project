import { View, Text, TextInput, useColorScheme } from 'react-native'
import React from 'react'
import DynamicIcon from './DynamicIcon'
import IconBtn from './IconBtn'


interface SearchBarProps {
    value: string
    onChangeText: (text: string) => void
    clearText: () => void
    background_type?: 'opaque' | 'transparent',
    placeholder?: string
}

const SearchBar: React.FC<SearchBarProps> = ({
    value,
    onChangeText,
    clearText,
    background_type = 'transparent',
    placeholder
}) => {

    const colorScheme = useColorScheme()

    return (
        <View
            className='relative w-full h-auto'
        >
            <View
                className='absolute top-3 left-3'
            >
                <DynamicIcon
                    name='Search'
                    color={background_type === 'transparent' ? '#eff6ff' : 
                        colorScheme === 'dark' ? '#eff6ff' : '#1e3a8a'
                    }
                    size={20}
                />
            </View>
            <TextInput
                className={`
                    w-full p-3 pl-12 pb-2.5 rounded-lg  font-poppins-regular 
                    ${background_type === 'transparent' ? 'text-background bg-background/20 placeholder:text-[#eff6ff]/70' : 'bg-text/10 placeholder:text-text/70 text-text dark:bg-background/10 dark:text-background dark:placeholder:text-background/70'}    
                `}
                placeholder={placeholder}
                onChangeText={onChangeText}
                value={value}
            />
            <View
                className={`absolute top-1.5 right-2 ${value !== '' ? 'flex' : 'hidden'}`}
            >
                <IconBtn
                    name={'X'}
                    onPress={clearText}
                    size={24}
                    strokeWidth={1.2}
                    colour={background_type === 'transparent' ? '#eff6ff' : 
                        colorScheme === 'dark' ? '#eff6ff' : '#1e3a8a'
                    }
                />  
            </View>          
        </View>
    )
}

export default SearchBar