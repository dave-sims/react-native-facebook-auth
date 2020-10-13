import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-elements'
import { Context as AuthContext } from '../context/AuthContext'
import { SafeAreaView } from 'react-navigation'
import { FontAwesome } from '@expo/vector-icons'

const SigninScreen = ({ navigation }) => {

    const { signin } = useContext(AuthContext)

    return <SafeAreaView style={styles.container}>
        <Button title=" Sign In With Facebook" icon={<FontAwesome name="facebook-official" size={28} color="white" />} onPress={() => {
            signin();
        }} />
    </SafeAreaView>
};

SigninScreen.navigationOptions = () => {
    return {
        headerShown: false
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 200

    }
});

export default SigninScreen;