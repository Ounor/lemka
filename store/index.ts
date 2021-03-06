import AsyncStorage from '@react-native-async-storage/async-storage'
import { combineReducers } from 'redux'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import { configureStore } from '@reduxjs/toolkit'
import { composeWithDevTools } from 'redux-devtools-extension'

import startup from './Startup'
import settings from './Settings'
import favoritesList from './FavoritesList'
import filter from './Filters'
import children from './Children'
import childrenSlice from './Children/AddChild'

const reducers = combineReducers({
  startup,
  settings,
  favoritesList,
  filter,
  childrenList: childrenSlice,

})

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['theme', 'favoritesList', 'settings', 'user', 'childrenList'],
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
    composeWithDevTools(middlewares)

    return middlewares
  },
})

const persistor = persistStore(store)

export { store, persistor }
