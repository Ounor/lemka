import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from 'react-native-ui-lib'

interface Props {
  id: number | string
  title: string
  content: string
  addToWish: () => void
  handleNavigate: () => void
  isInWish?: number
}

const CardLil = ({
  id,
  title,
  content,
  addToWish,
  isInWish,
  handleNavigate,
}: Props) => {
  return (
    <Card
      key={id}
      row
      height={120}
      style={{ backgroundColor: 'rgba(255,255,255,0.82)', marginBottom: 8 }}
      useNative
      activeOpacity={1}
      marginR-16
      marginL-16
      marginB-8
    >
      <TouchableOpacity onPress={handleNavigate}>
        <Card.Section
          imageSource={{ uri: 'https://picsum.photos/150' }}
          imageStyle={{ width: 90, height: '100%' }}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleNavigate}
        style={{
          paddingTop: 16,
          paddingRight: 40,
          padding: 8,
          paddingLeft: 12,
          flex: 1,
          overflow: 'hidden',
        }}
      >
        <Card.Section
          content={[
            { text: title, text70: true, grey10: true },
            {
              text: content,
              text80: true,
              grey10: true,
            },
          ]}
        />
        <TouchableOpacity
          onPress={() => addToWish()}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          style={{ position: 'absolute', zIndex: 10, right: 16, top: 16 }}
        >
          <FontAwesome name="heart" size={20} color={isInWish ? 'red' : '#c2c2c2'} />
        </TouchableOpacity>
        <LinearGradient
          colors={['#ffffff', 'rgba(255,255,255,0)']}
          style={{
            flex: 1,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 80,
          }}
          start={{ x: 1, y: 0.9 }}
          end={{ x: 1, y: 0 }}
        />
      </TouchableOpacity>
    </Card>
  )
}

export default CardLil
