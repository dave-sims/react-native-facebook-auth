import createDataContext from './createDataContext';
import * as Facebook from 'expo-facebook';
import { AsyncStorage } from 'react-native'
import { navigate } from '../navigationRef'

const authReducer = (state, action) => {
    switch (action.type) {
        case 'signin':
            return { token: action.payload.token, name: action.payload.name, imageUrl: action.payload.imageUrl, id: action.payload.id }
        case 'signout':
            return { token: null, name: '', imageUrl: null, id: null }
        default:
            return state;
    }
};

const signin = dispatch => {
    return async () => {
        try {
            await Facebook.initializeAsync({
                appId: '675035483123202',
            });
            console.log('log in..');
            const {
                type,
                token,
                expirationDate,
                permissions,
                declinedPermissions,
            } = await Facebook.logInWithReadPermissionsAsync({
                permissions: ['email', 'public_profile'],
            });
            console.log('check type..');
            if (type === 'success') {
                await AsyncStorage.setItem('token', token);
                // Get the user's name using Facebook's Graph API
                const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
                const { id, name } = await response.json();
                const profResp = await fetch(`https://graph.facebook.com/me/picture?height=960&width=960&redirect=false&access_token=${token}`);
                const { data } = await profResp.json();
                const imageUrl = data.url;
                dispatch({ type: 'signin', payload: { token, name, imageUrl, id } });
                // console.log(profRespJson)
                // console.log(permissions);
                // console.log(expirationDate);
                navigate('Content');
            } else {
                console.log('cancelled');
            }
        } catch (err) {
            console.log(err)
            alert(`Facebook Login Error: ${err.message}`);
        }
    }
};

const signout = dispatch => async () => {
    await Facebook.logOutAsync();
    await AsyncStorage.removeItem('token')
    dispatch({ type: 'signout' });
    navigate('Signin');
};

const tryLocalSignin = dispatch => async () => {
    try {
        await Facebook.initializeAsync({
            appId: '675035483123202',
        });
        const auth = await Facebook.getAuthenticationCredentialAsync();
        if (!auth) {
            navigate('Signin');
        } else {
            let token = auth.token;
            console.log(auth)
            await AsyncStorage.setItem('token', token);
            const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
            const { id, name } = await response.json();
            const profResp = await fetch(`https://graph.facebook.com/me/picture?height=960&width=960&redirect=false&access_token=${token}`);
            const { data } = await profResp.json();
            const imageUrl = data.url;
            dispatch({ type: 'signin', payload: { token, name, imageUrl, id } });
            navigate('Content');
        }
    } catch (err) {
        console.log(err)
        alert(`Facebook Login Error: ${err.message}`);
    }
}

export const { Provider, Context } = createDataContext(
    authReducer,
    { signin, signout, tryLocalSignin },
    { token: null, name: '', imageUrl: null }
);
