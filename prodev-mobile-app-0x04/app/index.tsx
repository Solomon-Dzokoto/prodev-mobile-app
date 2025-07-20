import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from '../styles/_mainstyle'
import { BACKGROUNDIMAGE, HEROLOGO } from '../constants'
import { useRouter } from 'expo-router'

const Index = () => {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <ImageBackground source={BACKGROUNDIMAGE} style={styles.backgroundImageContainer} >
                <View style={styles.logoContainer}>
                    <Image source={HEROLOGO} />
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>Welcome to ProDev</Text>
                    <View style={styles.titleSubTextContainer}>
                        <Text style={styles.titleSubText}>The best place to find your dream house</Text>
                    </View>
                </View>
                <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: 50 }}>
                    <View style={styles.buttonGroup}>
                        <TouchableOpacity style={styles.buttonPrimary} onPress={() => router.push('join')}>
                            <Text style={styles.buttonPrimaryText}>Join Now</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonSecondary} onPress={() => router.push('signin')}>
                            <Text style={styles.buttonSecondaryText}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

export default Index
