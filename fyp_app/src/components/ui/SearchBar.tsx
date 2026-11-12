import { View, Text, TextInput } from 'react-native'
import React from 'react'
import DynamicIcon from './DynamicIcon'
import IconBtn from './IconBtn'


interface SearchBarProps {
    value: string
    onChangeText: (text: string) => void,
    clearText: () => void
}

const SearchBar: React.FC<SearchBarProps> = ({
    value,
    onChangeText,
    clearText
}) => {
    return (
        <View
            className='relative w-full h-auto'
        >
            <View
                className='absolute top-3 left-3'
            >
                <DynamicIcon
                    name='Search'
                    color={'#eff6ff'}
                    size={20}
                />
            </View>
            <TextInput
                className='w-full p-3 pl-12 pb-2.5 text-background rounded-lg placeholder:text-[#eff6ff]/70 font-poppins-regular bg-background/40'
                placeholder='Search a contact...'
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
                />  
            </View>          
        </View>
    )
}

export default SearchBar