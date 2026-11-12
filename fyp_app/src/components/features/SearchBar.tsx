import { View, Text } from 'react-native'
import React from 'react'
import CustomTextInput from '../ui/CustomTextInput'

interface SearchBarProps {
    clear_search: () => void
    value: string
    
}

const SearchBar = () => {
    return (
        <View>
            
            <CustomTextInput>

            </CustomTextInput>

        </View>
    )
}

export default SearchBar