import React, { memo, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
import { login,updateUser } from '../services/users';

import {
  emailValidator,
  passwordValidator,
  nameValidator,
} from "../core/utils";

type Props = {
  navigation: any;
  route: any;
};

const RegisterScreen = ({ navigation, route }: Props) => {
  const [password, setPassword] = useState({ value: "", error: "" });
  const [npassword, setnPassword] = useState({ value: "", error: "" });
  const [cnpassword, setCnPassword] = useState({ value: "", error: "" });
  const user = route.params.user;

  const _onSignUpPressed = async() => {
    const passwordError = passwordValidator(password.value);
    const npasswordError = passwordValidator(npassword.value);
    const cnpasswordError = passwordValidator(npassword.value);

    if (passwordError || npasswordError) {
      setPassword({ ...password, error: passwordError });
      setnPassword({ ...npassword, error: npasswordError });
      setCnPassword({ ...cnpassword, error: cnpasswordError });
      return;
    }
    const userValue = {
      "username": user.phoneNumber,
      "password": password.value
    };
    const loginResponse = await login(userValue);
    if (loginResponse?.status===200) {
      if (cnpassword.value===npassword.value) {
        const newUser = {
          id:user._id,
          status: "true",
          password: cnpassword.value,
        };
        const response = await updateUser(newUser,loginResponse.data.access_token);
        console.log("response==>",response);
        if(response){
          navigation.navigate('LoginScreen');
        }
      }else{
        setCnPassword({ ...cnpassword, error: "password and confirm password does not match" })
      }
    }else{
      setPassword({ ...password, error: "password incorrect" })
    }
  };


  return (
    <Background>
      <BackButton goBack={() => navigation.navigate("LoginScreen")} />

      <Logo />

      <Header>Register Account</Header>

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <TextInput
        label="New npassword"
        returnKeyType="done"
        value={npassword.value}
        onChangeText={(text) => setnPassword({ value: text, error: "" })}
        error={!!npassword.error}
        errorText={npassword.error}
        secureTextEntry
      />
      <TextInput
        label="Confirm your new npassword"
        returnKeyType="done"
        value={cnpassword.value}
        onChangeText={(text) => setCnPassword({ value: text, error: "" })}
        error={!!cnpassword.error}
        errorText={cnpassword.error}
        secureTextEntry
      />

      <Button mode="contained" onPress={_onSignUpPressed} style={styles.button}>
        Confirm
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});

export default memo(RegisterScreen);
