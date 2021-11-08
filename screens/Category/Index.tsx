import React, {useEffect, useState} from 'react'
import {FlatList, ImageBackground, Text, TouchableOpacity, View} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import styles from '../Category/styles'
import {useDispatch, useSelector} from 'react-redux'
import AddToWish from '../../store/FavoritesList/AddOrRemoveWish'
import CardLil from '../../components/Card'
import {find, map,} from 'lodash'
import SetFilter from '../../store/Filters/SetFilter'
import {IFavoriteItem, IFavoritesList} from '../../store/FavoritesList'
import useAxios from "axios-hooks";
import LottieView from "lottie-react-native";
import BottomSheet from 'reanimated-bottom-sheet';
import {FontAwesome} from "@expo/vector-icons";

const CategoryContainer = ({route}) => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const filters = useSelector(
        (state: { filter: { filter } }) => state?.filter?.filter || [],
    )
    const sort = route.params.sort
    const sortBy = route.params.sortBy
    const isRiddles = route.params.id[0] === 82;
    const sheetRef = React.useRef(null);

    const favoritesList = useSelector(
        (state: { favoritesList: IFavoritesList }) =>
            state?.favoritesList?.list || [],
    )
    const [catalogData, setCatalogData] = useState([])

    const [{loading}, refetch] = useAxios(
        route.params.id[0] === 82 ? {
                url: 'https://lemka.fun/index.php/wp-json/v1/getRiddless/',
                method: "GET",
            } :
            {
                url: 'https://lemka.fun/index.php/wp-json/v1/getPosts/',
                method: "POST",
                data: {
                    category: route.params.id,
                    ...filters,
                    sortBy,

                }
            },
        {
            manual: true,
        })

    useEffect(() => {
        navigation.setOptions({
            title: route.params.title
        })
        refetch().then(e => {
            console.log(e.config.data)

            const newArr: ((prevState: never[]) => never[]) | { id: any; title: any; }[] = []
            setCatalogData([])
            map(e.data, (item) => newArr.push(item))
            setCatalogData(newArr)
        })
    }, [filters, sortBy])


    useEffect(() => {
        if (sort) {
            sheetRef.current.snapTo(0)
        } else {
            sheetRef.current.snapTo(1)

        }
    }, [sort])


    const _renderItem = ({item}: any) => {
        const {ID, post_title, post_content, img_medium, answer, psyComment}: IFavoriteItem = item
        const isInWish = find(favoritesList, ['id', ID])
        const content = post_content.replace(/<[^>]*>/ig, '')
        const addToWish = () => dispatch(AddToWish.action({id: ID, content, title: post_title, imageUri: img_medium}))
        const handleNavigate = () => {
            navigation.navigate('Article', {title: post_title, content, imageUri: img_medium, psyComment})
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
                answer={isRiddles && answer}
            />
        )
    }

    const renderContent = () => (
        <View
            style={{
                backgroundColor: '#fff',
                padding: 16,
                height: 450,
            }}
        >
            <TouchableOpacity
                onPress={() => navigation.setParams({
                    sortBy: {}
                })}
                style={{marginBottom: 24}}>
                <Text style={{fontSize: 16}}>По названию</Text>
            </TouchableOpacity>


            <TouchableOpacity
                onPress={() => navigation.setParams({
                    sortBy: ['ageFrom', 'ASC']
                })}
                style={{marginBottom: 24}}>
                <Text style={{fontSize: 16}}>По возрасту</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.setParams({
                    sortBy: ['childCount', 'ASC']
                })}
                style={{marginBottom: 24}}>
                <Text style={{fontSize: 16}}>По кол-ву детей</Text>
            </TouchableOpacity>
        </View>
    );

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
            <BottomSheet
                initialSnap={0}
                onCloseEnd={() => navigation.setParams({sort: false})}
                ref={sheetRef}
                renderHeader={() => <View style={{
                    flexDirection: 'row',
                    width: '100%',
                    backgroundColor: '#fff',
                    justifyContent: 'space-between'
                }}>
                    <Text style={{
                        padding: 16,
                        fontSize: 20,
                        borderBottomWidth: 1,
                        borderBottomColor: '#000'
                    }}>Сортировка</Text>
                    <TouchableOpacity onPress={() => sheetRef.current.snapTo(1)}
                    >
                        <FontAwesome style={{padding: 10,}} name="close" size={30} color={"#075131"}/>
                    </TouchableOpacity>
                </View>}
                snapPoints={[300, 0]}
                renderContent={renderContent}
            />
        </ImageBackground>
    )


}

export default CategoryContainer
