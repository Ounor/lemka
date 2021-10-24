import React, { memo, useEffect, useState } from 'react'
import Background from '../components/Background'
// @ts-ignore
// import { SignInWithAppleButton } from 'react-native-apple-authentication'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import { Navigation } from '../types'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type Props = {
  navigation: Navigation
}

const HomeScreen = ({ navigation }: Props) => {
  return (
    <Background>
      <Header>Чем занять ребёнка?</Header>

      <View style={styles.container}>
        <View style={styles.container}>
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('RegisterScreen')}
          >
            Регистрация
          </Button>
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('LoginScreen')}
          >
            Вход
          </Button>
        </View>

        <Paragraph style={styles.loginText}>Вход с помощью</Paragraph>
        <View style={styles.socContainer}>
          <TouchableOpacity>
            <Image source={require('../assets/fbBtn.png')} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../assets/gBtn.png')} />
          </TouchableOpacity>
          {/*{SignInWithAppleButton({*/}
          {/*  // buttonStyle: styles.appleBtn,*/}
          {/*  callBack: appleSignIn,*/}
          {/*  buttonText: 'Sign',*/}
          {/*})}*/}
        </View>
        <Paragraph style={styles.bottomStyle}>
          Зарегистрируйтесь, чтобы получать наиболее подходящие Вашему ребенку
          игры и занятия
        </Paragraph>
        <View />
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 40,
    alignContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    width: '100%',
    lineHeight: 20,
    fontSize: 12,
  },
  bottomStyle: {
    width: '100%',
    lineHeight: 20,
    fontSize: 15,
  },
  socContainer: {
    flexDirection: 'row',
    width: '70%',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 80,
    marginTop: 25,
  },
})

export default memo(HomeScreen)
