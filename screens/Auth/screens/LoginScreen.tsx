// import React, { memo, useState } from 'react'
// import { TouchableOpacity, StyleSheet, Text, View, Alert } from 'react-native'
// import Background from '../components/Background'
// import Header from '../components/Header'
// import Button from '../components/Button'
// import TextInput from '../components/TextInput'
// import { theme } from '../core/theme'
// import { emailValidator, passwordValidator } from '../core/utils'
// import { Navigation } from '../types'
// import auth from '@react-native-firebase/auth'
// import { StackActions } from '@react-navigation/native'
//
// type Props = {
//   navigation: Navigation
// }
//
// const LoginScreen = ({ navigation }: Props) => {
//   const [email, setEmail] = useState({ value: '', error: '' })
//   const [password, setPassword] = useState({ value: '', error: '' })
//
//   const _onLoginPressed = () => {
//     const emailError = emailValidator(email.value)
//     const passwordError = passwordValidator(password.value)
//
//     if (emailError || passwordError) {
//       setEmail({ ...email, error: emailError })
//       setPassword({ ...password, error: passwordError })
//       return
//     }
//
//     auth()
//       .signInWithEmailAndPassword(email.value, password.value)
//       .then(userCredential => {
//         const user = userCredential.user
//         if (user) {
//           // @ts-ignore
//           navigation.dispatch(
//             StackActions.replace('Main', {
//               user,
//             }),
//           )
//         }
//       })
//       .catch(e => {
//         console.log(e)
//         Alert.alert('Ошибка', 'Возможно вы ошиблись при вводе данных')
//       })
//   }
//
//   return (
//     <Background>
//       <Header>Вход</Header>
//
//       <TextInput
//         label="Email"
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
//       <View style={styles.forgotPassword}>
//         <TouchableOpacity
//           onPress={() => navigation.navigate('ForgotPasswordScreen')}
//         >
//           <Text style={styles.label}>Забыли пароль?</Text>
//         </TouchableOpacity>
//       </View>
//
//       <Button mode="outlined" onPress={_onLoginPressed}>
//         Вход
//       </Button>
//
//       <View style={styles.row}>
//         <Text style={styles.label}>Нет аккаунта? </Text>
//         <View>
//           <TouchableOpacity
//             onPress={() => navigation.navigate('RegisterScreen')}
//           >
//             <Text style={styles.link}>Регистрация</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Background>
//   )
// }
//
// const styles = StyleSheet.create({
//   forgotPassword: {
//     width: '100%',
//     alignItems: 'flex-end',
//     marginBottom: 24,
//   },
//   row: {
//     flexDirection: 'row',
//     marginTop: 4,
//     marginBottom: 40,
//   },
//   label: {
//     color: theme.colors.secondary,
//   },
//   link: {
//     fontWeight: 'bold',
//     color: theme.colors.blue,
//   },
// })
//
// export default memo(LoginScreen)
