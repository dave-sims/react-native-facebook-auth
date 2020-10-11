import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-navigation'
import { Button } from 'react-native-elements'

const Content2Screem = ({ navigation }) => {
    return <SafeAreaView>
        <Text>Content2</Text>
        <Button title="Go to content" onPress={() => {
            navigation.navigate('Content')
        }} />
    </SafeAreaView>
};

const styles = StyleSheet.create({

});

export default Content2Screem;