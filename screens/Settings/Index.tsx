import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useTranslation} from 'react-i18next'
import {useNavigation} from '@react-navigation/native'
import {List} from 'react-native-paper'
import {ImageBackground} from 'react-native'

const Settings = () => {
    const {t} = useTranslation()
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const logOut = () => {

    }

    return (
        <ImageBackground style={{width: '100%', height: '100%'}}
                         source={require('../../assets/images/searchBg.png')}>
            <List.Section style={{backgroundColor: 'rgba(194,194,194,0.78)', margin: 16, borderRadius: 20, marginTop: 90}}>
                <List.Subheader>Основное</List.Subheader>
                <List.Item
                    onPress={logOut}
                    title="Выход"
                    left={() => <List.Icon icon="logout"/>}
                />
                <List.Item
                    title="Очистить кэш"
                    left={() => <List.Icon color="#000" icon="pail-remove-outline"/>}
                />
                <List.Item
                    title="Изменить пароль"
                    left={() => <List.Icon color="#000" icon="onepassword"/>}
                />
                <List.Subheader>Настройки профиля</List.Subheader>
                <List.Item
                    onPress={() => navigation.navigate('AddChild')}
                    title="Добавить ребенка"
                    left={() => <List.Icon color="#000" icon="pencil-plus-outline"/>}
                />
                <List.Item
                    onPress={() => navigation.navigate('RemoveChild')}
                    title="Редактировать информацию"
                    left={() => <List.Icon icon="pencil-outline"/>}
                />
            </List.Section>
        </ImageBackground>
    )
}

export default Settings
