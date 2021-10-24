import React, {useCallback, useEffect, useRef, useState} from 'react'
import {View, Text, TouchableOpacity, FlatList, SafeAreaView} from 'react-native'
import styles from './styles'
import {useNavigation} from '@react-navigation/native'
import {LinearGradient} from 'expo-linear-gradient';
import useAxios from 'axios-hooks';
import map from 'lodash/map'
import {ImageBackground, Image} from 'react-native';
import LottieView from 'lottie-react-native';

//
const CatalogContainer = () => {
    const navigation = useNavigation()
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
        forceUpdate()
    }, [selectedCategoryFilter])

    useEffect(() => {
        // animation.current.play();

        refetch().then(e => {
            const newArr: ((prevState: never[]) => never[]) | { id: any; title: any; }[] = []
            map(e.data, (e: string, index: number) => {
                newArr.push({id: e.cat_ID, title: e.cat_name, slug: e.slug, tax_Image: e.tax_Image})
            })
            newArr.push({id: '', title: 'Все игры', slug: 'allGames', tax_Image: 'allGames'})
            setCategoryFilter(newArr)
        })
    }, [])


    const openCat = (id, title) => {
        navigation.navigate('Category', {id :[id], title})
    }

    const renderItem = ({item: {id, title, tax_Image}}: {
        id: number
        title: string
    }) => {
        const isContain = selectedCategoryFilter.indexOf(id) > -1;
        return (
            <TouchableOpacity
                onPress={() => openCat(id, title)}
                key={id}
            >
                <LinearGradient
                    style={[{
                        backgroundColor: 'rgba(0,90,60,0.7)',
                        paddingVertical: 12,
                        paddingLeft: !id ? 0 : 32,
                        flexDirection: "row",
                        marginBottom: 16,
                        borderRadius: 20,
                        justifyContent: !id ? 'center' : 'flex-start',
                        alignContent: "center",
                        alignItems: 'center'
                    }]}
                    colors={['#042B1A', '#075935']}
                    start={{x: 0, y: 0}}
                    end={{x: 0, y: 1}}
                >

                    {id ? <Image style={{tintColor: 'white', width: 50, height: 50, marginRight: 32}}
                                  source={{uri: tax_Image}}/> : null}
                <Text style={[styles.catalogTitle, isContain && {color: '#f1a01f'}, ]}>
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
                        style={{marginTop: 180}}
                        contentContainerStyle={styles.catalogContainer}
                        // columnWrapperStyle={styles.columnWrapper}
                        data={categoryFilter}
                        // numColumns={2}
                        renderItem={renderItem}
                    />
                    {/*<View>*/}
                    {/*    <LinearGradient*/}
                    {/*        style={{marginHorizontal: 16, marginBottom: 8, borderRadius: 8}}*/}
                    {/*        colors={['#042B1A', '#075935']}*/}
                    {/*        start={{x: 0, y: 0}}*/}
                    {/*        end={{x: 0, y: 1}}*/}
                    {/*    >*/}
                    {/*        <TouchableOpacity onPress={() => openCat('')} style={styles.btnContainer}>*/}
                    {/*            <Text style={styles.btnText}>Все игры</Text>*/}
                    {/*        </TouchableOpacity>*/}
                    {/*    </LinearGradient>*/}
                    {/*</View>*/}
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
                    // OR find more Lottie files @ https://lottiefiles.com/featured
                    // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
                />}

        </ImageBackground>
    )
}

export default CatalogContainer
