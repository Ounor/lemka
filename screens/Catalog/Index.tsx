import React, {useCallback, useEffect, useRef, useState} from 'react'
import {FlatList, Image, ImageBackground, Text, TouchableOpacity, View} from 'react-native'
import styles from './styles'
import {useNavigation, useRoute} from '@react-navigation/native'
import {LinearGradient} from 'expo-linear-gradient';
import useAxios from 'axios-hooks';
import map from 'lodash/map'
import LottieView from 'lottie-react-native';
import * as Analytics from 'expo-firebase-analytics';

//
const CatalogContainer = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const [categoryFilter, setCategoryFilter] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [selectedCategoryFilter, setSelectedCategoryFilter] = useState([])
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    const [{loading, error}, refetch] = useAxios(
        'https://lemka.fun/index.php/wp-json/v1/getCategories/',
        {
            manual: true,
        })
    const animation = useRef(null);

    useEffect(() => {
        if (route.params?.apply) {
            navigation.navigate('Category', {id: [route.params.id], title: route.params.title})
        }
    })

    useEffect(() => {
        // animation.current.play();

        Analytics.logEvent('test', {
            contentType: 'text',
            itemId: 'itemId!',
            method: 'method'
        });

        refetch().then(e => {
            const newArr: ((prevState: never[]) => never[]) | { id: any; title: any; }[] = []
            map(e.data, (e: string, index: number) => {
                newArr.push({id: e.cat_ID, title: e.cat_name, slug: e.slug, tax_Image: e.tax_Image})
            })
            newArr.push({id: '', title: 'Все игры', slug: 'allGames', tax_Image: 'https://lemka.fun/wp-content/uploads/category_all.png'})
            setCategoryFilter(newArr)
        })
    }, [])


    const openCat = (id, title) => {
        navigation.navigate('Category', {id: [id], title})
    }

    const _renderItem = ({item: {id, title, tax_Image}}: {
        id: number
        title: string
        tax_Image: string
    }) => {
        const isContain = selectedCategoryFilter.indexOf(id) > -1;
        return (
            <TouchableOpacity
                style={{width: '49%'}}
                onPress={() => openCat(id, title)}
                key={id}
            >
                <LinearGradient
                    style={[{
                        backgroundColor: 'rgba(0,90,60,0.7)',
                        paddingVertical: 12,
                        paddingLeft: 16,
                        flexDirection: "row",
                        marginBottom: 16,
                        borderRadius: 30,
                        justifyContent: 'flex-start',
                        alignContent: "center",
                        alignItems: 'center'
                    }]}
                    colors={id === '' || id === 82 ? ['#BC1E1E', '#590707'] : ['#042B1A', '#075935']}
                    start={{x: 0, y: 0}}
                    end={{x: 0, y: 1}}
                >
                    <View style={{
                        borderRadius: 50,
                        padding: 10,
                        backgroundColor: 'white',
                        width: 40,
                        height: 40,
                        marginRight: 8
                    }}>
                        <Image style={{tintColor: 'black', width: 20, height: 20}} resizeMode={'cover'}
                               source={{uri: tax_Image}}/>
                    </View>

                    <Text style={[styles.catalogTitle, isContain && {color: '#f1a01f'},]}>
                        {isContain}{title}
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        )
    }
    return (
        <ImageBackground style={{width: '100%', height: '100%', overflow: 'hidden'}}
                         source={require('../../assets/images/catalogBg.png')}>


            {isLoaded ?
                <>
                    <FlatList
                        ListHeaderComponent={() => <Text style={{
                            fontSize: 24, color: 'white', fontWeight: "bold", marginBottom: 32,
                        }}>Категории игр</Text>}
                        style={{marginTop: 160}}
                        contentContainerStyle={styles.catalogContainer}
                        data={categoryFilter}
                        numColumns={2}
                        columnWrapperStyle={{justifyContent: 'space-between'}}
                        renderItem={_renderItem}
                        keyExtractor={item => item.id.toString()}
                    />
                </>
                : <LottieView
                    loop={false}
                    autoPlay
                    onAnimationFinish={() => setIsLoaded(true)}
                    style={{
                        marginTop: 80,
                        width: 400,
                        height: 400,
                        backgroundColor: 'rgba(204,204,204,0)',
                    }}
                    source={require('../../assets/images/loader.json')}
                />}

        </ImageBackground>
    )
}

export default CatalogContainer
