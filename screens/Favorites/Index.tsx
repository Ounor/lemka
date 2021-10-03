import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, FlatList, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useNavigation, useRoute } from '@react-navigation/native'
import styles from '../Category/styles'
import { LinearGradient } from 'expo-linear-gradient';
import CardLil from '../../components/Card'
import { concat, find, indexOf } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import {IFavoritesList} from "../../store/FavoritesList";

const CategoryContainer = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const favoritesList = useSelector(
    (state: { favoritesList: IFavoritesList }) =>
      state?.favoritesList?.list || [],
  )

  const handleNavigate = (categoryId: number) => {
    navigation.navigate('Category', { categoryId })
  }

  const openRandom = () => {
    handleNavigate(12)
  }

  const renderItem = ({
    item: { id, content, title },
  }: {
    id: number
    title: string
    content: string
  }) => {
    const isInWish = true
    const addToWish = () => dispatch(AddToWish.action({ id }))
    const handleNavigate = (id: number) => {
      navigation.navigate('Article', { title, content })
    }
    return (
      <CardLil
        handleNavigate={handleNavigate}
        isInWish={isInWish}
        addToWish={addToWish}
        id={id}
        content={content}
        title={title}
      />
    )
  }

  return (
    <FlatList
      style={styles.catalogContainer}
      data={favoritesList}
      renderItem={renderItem}
    />
  )
}

export default CategoryContainer
