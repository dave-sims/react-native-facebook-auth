import React, { useContext } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-navigation'
import { Button } from 'react-native-elements'
import { Context as AuthContext } from '../context/AuthContext';

const ContentScreem = ({ navigation }) => {

    const { state: { name, imageUrl }, signout } = useContext(AuthContext);

    return <SafeAreaView>
        <Text>Hello {name}</Text>
        {imageUrl
            ?
            <Image source={{ uri: imageUrl }} style={{ width: 100, height: 100, marginVertical: 50 }} />
            :
            null
        }
        <Button title="Go to content2" onPress={() => {
            navigation.navigate('Content2')
        }} />

        <Button style={{ marginTop: 20 }} title="Sign Out" onPress={signout} />
    </SafeAreaView>
};

const styles = StyleSheet.create({

});

export default ContentScreem;