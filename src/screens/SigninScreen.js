import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements'
import { Context as AuthContext } from '../context/AuthContext'

const SigninScreen = ({ navigation }) => {

    const { signin } = useContext(AuthContext)

    return <>
        <Text>Sign in</Text>
        <Button title="Sign In With Facebook" onPress={() => {
            signin();
        }} />
    </>
};

const styles = StyleSheet.create({

});

export default SigninScreen;