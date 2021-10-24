import React, {useEffect, useRef, useState} from 'react'
import {FlatList, ImageBackground, Text, TouchableOpacity, View} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import styles from '../Category/styles'
import {useDispatch, useSelector} from 'react-redux'
import AddToWish from '../../store/FavoritesList/AddOrRemoveWish'
import CardLil from '../../components/Card'
import {
    assign,
    filter,
    find,
    includes,
    matches,
    intersectionWith,
    isBoolean,
    isEqual,
    map,
    parseInt,
    slice,
} from 'lodash'
import SetFilter from '../../store/Filters/SetFilter'
import {white} from 'react-native-paper/lib/typescript/styles/colors'
import {IFavoriteItem, IFavoritesList} from '../../store/FavoritesList'
import useAxios from "axios-hooks";
import LottieView from "lottie-react-native";

const CategoryContainer = ({route}) => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const filters = useSelector(
        (state: { filter: { filter } }) => state?.filter?.filter || [],
    )

    const favoritesList = useSelector(
        (state: { favoritesList: IFavoritesList }) =>
            state?.favoritesList?.list || [],
    )
    const [catalogData, setCatalogData] = useState([])
    const [filteredCatalogData, setFilteredCatalogData] = useState([])

    const [{data, loading, error}, refetch] = useAxios(
        {
            url: 'https://lemka.fun/index.php/wp-json/v1/getPosts/',
            method: "POST",
            data: {
                category: route.params.id,
                ...filters
            }
        },
        {
            manual: true,
        })

    const animation = useRef(null);

    useEffect(() => {
        navigation.setOptions({
            title: route.params.title
        })
        refetch().then(e => {
            const newArr: ((prevState: never[]) => never[]) | { id: any; title: any; }[] = []
            map(e.data, (item) => newArr.push(item))
            setCatalogData(newArr)
        })
    }, [filters])

    const _renderItem = ({item}: any) => {
        const {ID, post_title, post_content, img_medium}: IFavoriteItem = item
        const isInWish = find(favoritesList, ['id', ID])
        const content = post_content.replace(/<[^>]*>/ig, '')
        const addToWish = () => dispatch(AddToWish.action({id: ID, content, title: post_title, imageUri: img_medium}))
        // console.log(item)
        const handleNavigate = () => {
            navigation.navigate('Article', {title: post_title, content, imageUri: img_medium})
        }
        return (
            <CardLil
                image={img_medium}
                isInWish={isInWish}
                handleNavigate={handleNavigate}
                addToWish={addToWish}
                id={ID}
                content={post_content.replace(/<[^>]*>/ig, '')}
                title={post_title}
            />
        )
    }

    if (loading && animation?.current) {
        animation.current.play();
    }
    return (
        <ImageBackground style={{width: '100%', height: '100%'}}
                         source={require('../../assets/images/searchBg.png')}>
            {loading ? <LottieView
                    autoPlay
                    loop={false}
                    style={{
                        marginTop: 80,
                        width: 400,
                        height: 400,
                        backgroundColor: 'rgba(204,204,204,0)',
                    }}
                    source={require('../../assets/images/loader.json')}
                    // OR find more Lottie files @ https://lottiefiles.com/featured
                    // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
                />
                :
                <FlatList
                    ListEmptyComponent={() => (
                        <View style={{margin: 16}}>
                            <Text style={{textAlign: 'center', fontSize: 16}}>
                                По вашему запросу ничего не найдено
                            </Text>
                            <TouchableOpacity
                                style={{
                                    margin: 20,
                                    padding: 16,
                                    borderRadius: 20,
                                    backgroundColor: '#c2c2c2',
                                }}
                                onPress={() => dispatch(SetFilter.action({}))}
                            >
                                <Text
                                    style={{color: 'white', textAlign: 'center', fontSize: 16}}
                                >
                                    Сбросить фильтр
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={(item, index) => item.ID.toString()}
                    style={styles.catalogContainer}
                    data={catalogData}
                    renderItem={_renderItem}
                />}
        </ImageBackground>
    )
}

export default CategoryContainer
