import React, { memo, useState } from 'react'
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native'
import { emailValidator } from '../core/utils'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import { theme } from '../core/theme'
import Button from '../components/Button'
import { Navigation } from '../types'

type Props = {
  navigation: Navigation
}

const ForgotPasswordScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState({ value: '', error: '' })

  const _onSendPressed = () => {
    const emailError = emailValidator(email.value)

    if (emailError) {
      setEmail({ ...email, error: emailError })
      return
    }

    navigation.navigate('LoginScreen')
  }

  return (
    <Background>
      <Header>Восстановить пароль</Header>

      <TextInput
        label="E-mail адрес"
        returnKeyType="done"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <Button mode="outlined" onPress={_onSendPressed} style={styles.button}>
        Отправить
      </Button>
      <View />
    </Background>
  )
}

const styles = StyleSheet.create({
  back: {
    width: '100%',
    marginTop: 12,
    marginBottom: 40,
  },
  button: {
    marginTop: 12,
  },
  label: {
    color: theme.colors.secondary,
    width: '100%',
  },
})

export default memo(ForgotPasswordScreen)
