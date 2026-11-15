import { View, Text } from 'react-native'
import React from 'react'

interface SettingsBtn {
    name: string
    icon_name: string
    onPress: () => void
    
}

const SettingsBtn = () => {
    return (
        <View>
            <Text>SettingsBtn</Text>
        </View>
    )
}

export default SettingsBtn