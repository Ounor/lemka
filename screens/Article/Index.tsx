import React, { useEffect, useState } from 'react'
import { FlatList, ImageBackground, ScrollView, Text, View } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import styles from './styles'

import { Paragraph } from 'react-native-paper'

const ArticleContainer = () => {
  const navigation = useNavigation()
  const route = useRoute()
  useEffect(() => {
    navigation.setOptions({ title: route.params.title })
  })
  return (
      <ImageBackground style={{width: '100%', height: '100%'}}
                       source={require('../../assets/images/gameBg.png')}>
    <ScrollView style={styles.catalogContainer}>
      <Paragraph>{route.params.content}</Paragraph>
    </ScrollView>
      </ImageBackground>

  )
}

export default ArticleContainer
