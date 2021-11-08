import React, {useEffect} from 'react'
import {Dimensions, Image, ImageBackground, ScrollView, Text, View} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import styles from './styles'

import {Paragraph} from 'react-native-paper'

const ArticleContainer = ({route}) => {
    const navigation = useNavigation()
    useEffect(() => {
        navigation.setOptions({title: route.params.title})
    })


    const windowWidth = Dimensions.get('window').width;

    return (
        <ImageBackground style={{width: '100%', height: '100%'}}
                         source={require('../../assets/images/gameBg.png')}>
            <View style={{paddingTop: 100}}/>
            {route.params.imageUri && <View style={{
                borderRadius: 20, overflow: 'hidden', margin: 16,
            }}>
                <Image style={{width: windowWidth, height: windowWidth * .6}} resizeMode={"cover"}
                       source={{uri: route.params.imageUri || ''}}/>
            </View>}
            <ScrollView style={styles.catalogContainer}>

                <Text style={{fontSize: 16, fontWeight: 'bold', marginVertical: 32}}>Правила игры</Text>
                <Paragraph style={{
                    fontSize: 14, color: '#232323', paddingBottom: 60,
                }}>{route.params.content}



                </Paragraph>

                {
                    route.params?.psyComment ? (
                        <>
                            <Text style={{fontSize: 16, fontWeight: 'bold', fontStyle: "italic"}}>
                                Комментарий психолога:
                            </Text>
                            <Paragraph style={{
                                fontSize: 14, color: '#232323', paddingTop: 20, paddingBottom: 60, fontStyle: "italic"
                            }}>
                                {route.params?.psyComment}
                            </Paragraph>
                        </>

                    ) : null


                }

            </ScrollView>
        </ImageBackground>

    )
}

export default ArticleContainer
