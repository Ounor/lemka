import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  View,
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { useTranslation } from 'react-i18next'
import { StackActions, useNavigation } from '@react-navigation/native'
import { List } from 'react-native-paper'

const SettingsContainer = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const logOut = () => {

  }

  return (
    <List.Section>
      <List.Subheader>Основное</List.Subheader>
      <List.Item
        onPress={logOut}
        title="Выход"
        left={() => <List.Icon icon="logout" />}
      />
      <List.Item
        title="Очистить кэш"
        left={() => <List.Icon color="#000" icon="pail-remove-outline" />}
      />
        <List.Item
        title="Изменить пароль"
        left={() => <List.Icon color="#000" icon="onepassword" />}
      />
      <List.Subheader>Настройки профиля</List.Subheader>
      <List.Item
        title="Добавить ребенка"
        left={() => <List.Icon color="#000" icon="pencil-plus-outline" />}
      />
      <List.Item
        title="Редактировать информацию"
        left={() => <List.Icon icon="pencil-outline" />}
      />
    </List.Section>
  )
}

export default SettingsContainer
