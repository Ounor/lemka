// import React, { memo, useState } from 'react'
// import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
// import Background from '../components/Background'
// import Header from '../components/Header'
// import Button from '../components/Button'
// import TextInput from '../components/TextInput'
// import { theme } from '../core/theme'
// import { Navigation } from '../types'
// import { emailValidator, passwordValidator, nameValidator } from '../core/utils'
// import auth from '@react-native-firebase/auth'
// import { StackActions } from '@react-navigation/native'
//
// type Props = {
//   navigation: Navigation
// }
//
// const RegisterScreen = ({ navigation }: Props) => {
//   const [name, setName] = useState({ value: '', error: '' })
//   const [email, setEmail] = useState({ value: '', error: '' })
//   const [password, setPassword] = useState({ value: '', error: '' })
//
//   const _onSignUpPressed = () => {
//     const nameError = nameValidator(name.value)
//     const emailError = emailValidator(email.value)
//     const passwordError = passwordValidator(password.value)
//
//     if (emailError || passwordError || nameError) {
//       setName({ ...name, error: nameError })
//       setEmail({ ...email, error: emailError })
//       setPassword({ ...password, error: passwordError })
//       return
//     }
//
//     auth()
//       .createUserWithEmailAndPassword(email.value, password.value)
//       .then(additionalUserInfo => {
//           console.log(additionalUserInfo)
//         // const user = additionalUserInfo.user
//         // if (user) {
//         //   // @ts-ignore
//         //   navigation.dispatch(
//         //     StackActions.replace('Main', {
//         //       user,
//         //     }),
//         //   )
//         // }
//       })
//       .catch(e => {
//         console.log(e)
//         Alert.alert('Ошибка', e.toString())
//       })
//   }
//
//   return (
//     <Background>
//       <Header>Регистрация</Header>
//
//       <TextInput
//         label="Имя"
//         returnKeyType="next"
//         value={name.value}
//         onChangeText={text => setName({ value: text, error: '' })}
//         error={!!name.error}
//         errorText={name.error}
//       />
//
//       <TextInput
//         label="Почта"
//         returnKeyType="next"
//         value={email.value}
//         onChangeText={text => setEmail({ value: text, error: '' })}
//         error={!!email.error}
//         errorText={email.error}
//         autoCapitalize="none"
//         autoCompleteType="email"
//         textContentType="emailAddress"
//         keyboardType="email-address"
//       />
//
//       <TextInput
//         label="Пароль"
//         returnKeyType="done"
//         value={password.value}
//         onChangeText={text => setPassword({ value: text, error: '' })}
//         error={!!password.error}
//         errorText={password.error}
//         secureTextEntry
//       />
//
//       <Button mode="outlined" onPress={_onSignUpPressed} style={styles.button}>
//         Регистрация
//       </Button>
//
//       <View style={styles.row}>
//         <Text style={styles.label}>Уже есть аккаунт? </Text>
//         <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
//           <Text style={styles.link}>Войти</Text>
//         </TouchableOpacity>
//       </View>
//     </Background>
//   )
// }
//
// const styles = StyleSheet.create({
//   label: {
//     color: theme.colors.secondary,
//   },
//   button: {
//     marginTop: 24,
//   },
//   row: {
//     flexDirection: 'row',
//     marginTop: 4,
//     marginBottom: 40,
//   },
//   link: {
//     fontWeight: 'bold',
//     color: theme.colors.blue,
//   },
// })
//
// export default memo(RegisterScreen)
