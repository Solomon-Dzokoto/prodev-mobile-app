import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { styles } from '../styles/_joinstyle'
import { AntDesign } from '@expo/vector-icons';
import { FACEBOOKLOGO, GOOGLELOGO, HEROLOGOGREEN } from '../constants';
import { useRouter } from 'expo-router';

const SignIn = () => {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <View style={styles.iconsection}>
                <TouchableOpacity onPress={() => router.back()}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
                <Image source={HEROLOGOGREEN} />
            </View>
            <View style={styles.titleTextGroup}>
                <Text style={styles.titleText}>Sign In</Text>
                <Text style={styles.subText}>Welcome back, you've been missed</Text>
            </View>
            <View style={styles.formGroup}>
                <View>
                    <Text style={styles.formLabel}>Email</Text>
                    <TextInput style={styles.formControl} />
                </View>
                <View>
                    <Text style={styles.formLabel}>Password</Text>
                    <View style={styles.formPasswordControl}>
                        <TextInput style={styles.passwordControl} />
                        <AntDesign name="eye" size={24} color="black" />
                    </View>
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </View>
                <TouchableOpacity style={styles.primaryButton}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.dividerGroup}>
                <View style={styles.divider} />
                <Text style={styles.dividerText}>or</Text>
                <View style={styles.divider} />
            </View>
            <View style={styles.secondaryButtonGroup}>
                <TouchableOpacity style={styles.secondaryButton}>
                    <Image source={GOOGLELOGO} />
                    <Text style={styles.secondaryButtonText}>Continue with Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.secondaryButton}>
                    <Image source={FACEBOOKLOGO} />
                    <Text style={styles.secondaryButtonText}>Continue with Facebook</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.signupgroup}>
                <Text style={styles.signupTitleText}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => router.push('join')}>
                    <Text style={styles.signupSubTitleText}>Join Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SignIn
