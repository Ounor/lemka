// import React, { useEffect, useState, FunctionComponent } from 'react'
// import { createStackNavigator } from '@react-navigation/stack'
// import { IndexStartupContainer } from '../screens/Containers'
// import { useSelector } from 'react-redux'
// import { NavigationContainer } from '@react-navigation/native'
// import { navigationRef } from '@/Navigators/Root'
// import { Alert, SafeAreaView, StatusBar } from 'react-native'
// import { StartupState } from '@/store/Startup'
// import {
//   Text,
//   View,
//   Assets,
//   Constants,
//   Button,
//   Colors,
//   Typography,
// } from 'react-native-ui-lib'
//
// import auth from '@react-native-firebase/auth'
// import MainNavigator from '../Navigators/Main'
// import AuthNavigator from '../Navigators/Auth'
//
// const Stack = createStackNavigator()
//
// // let MainNavigator: FunctionComponent | null
// // let AuthNavigator: FunctionComponent | null
//
// // @refresh reset
// const ApplicationNavigator = (props) => {
//   const { darkMode, NavigationTheme } = useTheme()
//   const [initializing, setInitializing] = useState(true)
//   const [user, setUser] = useState()
//
//   function onAuthStateChanged(user: any) {
//     setUser(user)
//     if (initializing) {
//       setTimeout(() => {
//         setInitializing(false)
//       }, 1000)
//     }
//   }
//
//   useEffect(() => {
//     const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
//     return subscriber // unsubscribe on unmount
//   }, [])
//
//   return (
//     <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
//       <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
//       <Stack.Navigator
//         initialRouteName={user ? 'Main' : 'Auth'}
//         headerMode={'none'}
//       >
//         {initializing ? (
//           <Stack.Screen name="Startup" component={IndexStartupContainer} />
//         ) : user ? (
//           <Stack.Screen
//             name="Main"
//             component={MainNavigator}
//             initialParams={{ showModal: props.showModal }}
//             options={{
//               animationEnabled: false,
//             }}
//           />
//         ) : (
//           <Stack.Screen
//             name="Auth"
//             component={AuthNavigator}
//             options={{
//               animationEnabled: false,
//             }}
//           />
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   )
// }
//
// export default ApplicationNavigator
