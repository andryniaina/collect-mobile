import React, {memo, useState} from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import {theme} from '../core/theme';
import { login,getUserByPhone } from '../services/users';
import * as Network from 'expo-network';
import { insertUserToDatabase,loginUserFromDatabase } from '../config/sqlite/db';

type Props = {
  navigation: any;
  route:any;
};

const LoginScreen = ({navigation,route}: Props) => {
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});

  const _onLoginPressed = async() => {
    // let userValue = {
    //   "id":"",
    //   "username": email.value,
    //   "password": password.value,
    //   "token":""
    // };
    // const netState=await Network.getNetworkStateAsync();
    // if (netState.isConnected && netState.isInternetReachable) {
    //   const user = await getUserByPhone(email.value);
    //   console.log("user==>",user);
    //   if (user.status==="true") {
    //     const response = await login(userValue)
    //     if(response?.status===200){
    //       userValue.id = user._id;
    //       userValue.token = response.data.access_token;
    //       await insertUserToDatabase(userValue);
    //       navigation.navigate('Dashboard');
    //     }else{
    //       setEmail({value:"",error:"Credential error"});
    //       setPassword({value:"",error:"Credential error"});
    //     } 
    //   }else{
    //     navigation.navigate('RegisterScreen',{user});
    //   } 
    // }else{
    //   const localLogin=await loginUserFromDatabase(userValue);
    //   if (localLogin[0]) {
    //     navigation.navigate('Dashboard');
    //   }
    // }
    // setPassword({value:"",error:""});
            navigation.navigate('Dashboard');
  };

  return (
    <Background>
      <Logo />

      <Header>Welcome back.</Header>

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({value: text, error: ''})}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({value: text, error: ''})}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <Button mode="contained" onPress={_onLoginPressed}>
        Login
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Forgot your password? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
          <Text style={styles.link}>Click here</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default memo(LoginScreen);
