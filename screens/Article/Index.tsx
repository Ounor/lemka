import React, { useEffect, useState } from 'react'
import {FlatList, Image, ImageBackground, ScrollView, Text, View} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import styles from './styles'

import { Paragraph } from 'react-native-paper'
import { Dimensions } from 'react-native'

const ArticleContainer = ({route}) => {
  const navigation = useNavigation()
  useEffect(() => {
    navigation.setOptions({ title: route.params.title })
  })


  const windowWidth = Dimensions.get('window').width;

  return (
      <ImageBackground style={{width: '100%', height: '100%'}}
                       source={require('../../assets/images/gameBg.png')}>
    <ScrollView style={styles.catalogContainer}>
      {route.params.imageUri && <View style={{borderRadius: 20, overflow: 'hidden', marginBottom: 16,}}>
        <Image style={{width: windowWidth, height: windowWidth * .6}} resizeMode={"cover"} source={{uri: route.params.imageUri || ''}} />
      </View> }

      <Paragraph style={{fontSize: 16, color: '#232323', fontWeight: 'bold'}}>{route.params.content}</Paragraph>
    </ScrollView>
      </ImageBackground>

  )
}

export default ArticleContainer
