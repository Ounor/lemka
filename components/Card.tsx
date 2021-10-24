import React from 'react'
import {Dimensions, Image, Text, TouchableOpacity, View} from 'react-native'
import {FontAwesome} from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient';
import {Card} from 'react-native-ui-lib'

interface Props {
    id: number | string
    title: string
    content: string
    addToWish: () => void
    handleNavigate: () => void
    isInWish?: number,
    image: string
}

const CardLil = ({
                     id,
                     title,
                     content,
                     addToWish,
                     isInWish,
                     image,
                     handleNavigate,
                 }: Props) => {
    return (


        <TouchableOpacity
            disabled
            style={{
                justifyContent: 'space-between',
                paddingTop: 14,
                paddingHorizontal: 16,
                flex: 1,
                overflow: 'hidden',
                backgroundColor: 'rgba(255,255,255,0.80)',
                marginHorizontal: 16,
                marginBottom: 16,
                borderRadius: 20,
            }}
        >
            <View style={{
                flexDirection: "row",
            }}>
                {image ? <Image style={{width: 100, height: 100, borderRadius: 30, marginRight: 16, marginTop: 10}}
                                source={{uri: image || ''}}/> : null}
                <View style={image ? {width: Dimensions.get('window').width - 180} : {width: '100%'}}>
                    <Text style={{
                        fontSize: 14,
                        marginTop: 10,
                        marginRight: 30,
                        fontWeight: 'bold',
                        marginBottom: 12
                    }}>{title}</Text>
                    <Text style={{fontSize: 14, lineHeight: 24, width: '100%'}} numberOfLines={4}>{content}</Text>
                </View>
            </View>
            <View style={{flexDirection: "column", alignItems: 'flex-end', width: '100%'}}>
                <TouchableOpacity onPress={handleNavigate}
                >
                    <LinearGradient
                        colors={['#BC1E1E', '#590707']}
                        style={{marginVertical: 20, borderRadius: 16}}
                        start={{x: 1, y: 0.9}}
                        end={{x: 1, y: 0}}
                    >
                        <Text style={{padding: 10, paddingHorizontal: 16, color: "white"}}>Подробнее</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>


            <TouchableOpacity
                onPress={() => addToWish()}
                hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}
                style={{
                    position: 'absolute',
                    zIndex: 10,
                    right: 16,
                    top: 10,
                    backgroundColor: 'white',
                    borderRadius: 40,
                    padding: 8
                }}
            >
                <FontAwesome name="heart" size={20} color={isInWish ? 'red' : '#c2c2c2'}/>
            </TouchableOpacity>
            {/*<LinearGradient*/}
            {/*    colors={['#ffffff', 'rgba(255,255,255,0)']}*/}
            {/*    style={{*/}
            {/*        flex: 1,*/}
            {/*        position: 'absolute',*/}
            {/*        bottom: 0,*/}
            {/*        left: 0,*/}
            {/*        right: 0,*/}
            {/*        height: 80,*/}
            {/*    }}*/}
            {/*    start={{x: 1, y: 0.9}}*/}
            {/*    end={{x: 1, y: 0}}*/}
            {/*/>*/}
        </TouchableOpacity>
    )
}

export default CardLil
