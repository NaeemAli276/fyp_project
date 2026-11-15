import { View, Text } from 'react-native'
import React from 'react'
import IconBtn from '../ui/IconBtn'
import SearchBar from '../ui/SearchBar'
import { useRouter } from 'expo-router'

interface TopBarProps {
    handleChangeText: (text: string) => void
    search_query: string
    clearText: () => void
}

const TopBar: React.FC<TopBarProps> = ({
    handleChangeText,
    search_query,
    clearText
}) => {

    const router = useRouter()

    return (
        <View
            className='bg-primary dark:bg-dark_primary rounded-b-[2rem] flex flex-col gap-8 h-auto py-8'
        >              
            {/* title and settings btn */}
            <View
                className='flex flex-row items-center justify-between w-full h-auto pt-6 pl-8 pr-7'
            >
                <Text
                    className='text-2xl text-background font-poppins-semibold '
                >
                    Contacts
                </Text>

                {/* search user btn and settings btn */}
                <View
                    className='flex flex-row items-center w-auto h-auto gap-2'
                >
                    <IconBtn
                        name={'UserPlus'}
                        onPress={() => router.push('/searchPage')}
                        size={24}
                        strokeWidth={1.2}
                    />

                    <IconBtn
                        name={'Settings'}
                        onPress={() => router.push('/settingsScreen')}
                        size={24}
                        strokeWidth={1.2}
                    />
                </View>
            </View>

            {/* search bar */}
            <View
                className='px-8'
            >
                <SearchBar
                    onChangeText={handleChangeText}
                    value={search_query}
                    clearText={clearText}
                    placeholder='Search your contacts...'
                />
            </View>

        </View> 
    )
}

export default TopBar