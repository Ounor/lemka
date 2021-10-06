import React, {useEffect, useState} from 'react'
import {Text, TouchableOpacity, FlatList, View} from 'react-native'
import {useTranslation} from 'react-i18next'
import {useNavigation, useRoute} from '@react-navigation/native'
import styles from '../Category/styles'
import {LinearGradient} from 'expo-linear-gradient';
import CardLil from '../../components/Card'
import {useDispatch, useSelector} from 'react-redux'
import {IFavoritesList} from "../../store/FavoritesList";
import {ImageBackground} from 'react-native'
import AddToWish from '../../store/FavoritesList/AddOrRemoveWish'

const CategoryContainer = () => {
    const {t} = useTranslation()
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const favoritesList = useSelector(
        (state: { favoritesList: IFavoritesList }) =>
            state?.favoritesList?.list || [],
    )
    // console.log(favoritesList)
    const handleNavigate = (categoryId: number) => {
        navigation.navigate('Category', {categoryId})
    }

    const openRandom = () => {
        handleNavigate(12)
    }

    const renderItem = ({
                            item: {id, content, title, imageUri},
                        }: {
        id: number
        title: string
        content: string
    }) => {
        const isInWish = true
        const addToWish = () => dispatch(AddToWish.action({id}))
        const handleNavigate = (id: number) => {
            navigation.navigate('Article', {title, content, imageUri: imageUri})
        }
        return (
            <CardLil
                handleNavigate={handleNavigate}
                isInWish={isInWish}
                image={imageUri}
                addToWish={addToWish}
                id={id}
                content={content}
                title={title}
            />
        )
    }

    return (
        <ImageBackground style={{width: '100%', height: '100%'}}
                         source={require('../../assets/images/searchBg.png')}>
            <FlatList
                style={styles.catalogContainer}
                data={favoritesList}
                renderItem={renderItem}
            />
        </ImageBackground>
    )
}

export default CategoryContainer
