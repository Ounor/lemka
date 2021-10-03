// import React from 'react'
// // @ts-ignore
// import Icon from 'react-native-vector-icons/FontAwesome'
//
// import { CatalogNavigator, SettingsNavigator } from '@/Navigators'
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
// import FavoritesNavigator from './Favorites'
//
// const Tab = createMaterialBottomTabNavigator()
//
// // @refresh reset
// function MainNavigator({ route: { params } }) {
//   return (
//     <Tab.Navigator
//       labeled={true}
//       shifting={true}
//       activeColor="#f0edf6"
//       inactiveColor="#3e2465"
//     >
//       <Tab.Screen
//         options={{
//           title: 'Каталог',
//           tabBarColor: '#694fad',
//           tabBarIcon: () => <Icon name="angellist" size={20} color="white" />,
//         }}
//         name="Catalog"
//         initialParams={{ showModal: params.showModal }}
//         component={CatalogNavigator}
//       />
//       <Tab.Screen
//         options={{
//           title: 'Избранное',
//           tabBarColor: '#96C2BB',
//           tabBarIcon: () => <Icon name="heart" size={20} color="white" />,
//         }}
//         name="Favorites"
//         component={FavoritesNavigator}
//       />
//       <Tab.Screen
//         options={{
//           title: 'Настройки',
//           tabBarColor: '#FFBF19',
//           tabBarIcon: () => <Icon name="cogs" size={20} color="white" />,
//         }}
//         name="Settings"
//         component={SettingsNavigator}
//       />
//     </Tab.Navigator>
//   )
// }
//
// export default MainNavigator
