// import React from 'react'
// import { createStackNavigator } from '@react-navigation/stack'
// import {
//   ArticleContainer,
//   CatalogContainer,
//   CategoryContainer,
//   FavoritesContainer,
// } from '@/Containers'
// import { TouchableOpacity } from 'react-native-ui-lib'
// import { Image } from 'react-native'
// import { LinearGradient } from 'expo-linear-gradient';
//
// const Stack = createStackNavigator()
//
// const FavoritesNavigator = () => {
//   const { Images } = useTheme()
//
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         options={() => ({
//           headerBackTitleVisible: false,
//           headerLeftContainerStyle: { marginLeft: 8 },
//           headerTintColor: 'white',
//           title: 'Сохраненное',
//           headerBackground: () => (
//             <LinearGradient
//               colors={['#96C2BB', '#6BB3A7']}
//               style={{ flex: 1 }}
//               start={{ x: 0, y: 1 }}
//               end={{ x: 1, y: 0 }}
//             />
//           ),
//           // headerStyle: { paddingHorizontal: 16 },
//           headerTitleStyle: { color: '#fff' },
//           // headerRight: () => (
//           //   <TouchableOpacity style={{ paddingHorizontal: 16 }}>
//           //     <Image
//           //       style={{ width: 20, height: 20 }}
//           //       source={Images.settings}
//           //     />
//           //   </TouchableOpacity>
//           // ),
//         })}
//         name="Category"
//         component={FavoritesContainer}
//       />
//       <Stack.Screen
//         options={() => ({
//           // title: 'Каталог активностей',
//           headerBackTitleVisible: false,
//           headerTintColor: 'white',
//
//           headerBackground: () => (
//             <LinearGradient
//               colors={['#96C2BB', '#6BB3A7']}
//               style={{ flex: 1 }}
//               start={{ x: 0, y: 1 }}
//               end={{ x: 1, y: 0 }}
//             />
//           ),
//           headerTitleStyle: { color: '#fff' },
//           headerRight: () => (
//             <TouchableOpacity style={{ paddingHorizontal: 16 }}>
//               <Image
//                 style={{ width: 20, height: 20 }}
//                 source={Images.settings}
//               />
//             </TouchableOpacity>
//           ),
//         })}
//         name="Article"
//         component={ArticleContainer}
//       />
//     </Stack.Navigator>
//   )
// }
//
// export default FavoritesNavigator
