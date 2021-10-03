import React, {useCallback, useEffect, useState} from 'react'
import {View, Text, TouchableOpacity, FlatList} from 'react-native'
import styles from './styles'
import {useNavigation} from '@react-navigation/native'
import {LinearGradient} from 'expo-linear-gradient';
import useAxios from 'axios-hooks';
import map from 'lodash/map'
import {ImageBackground} from 'react-native';

//
const CatalogContainer = () => {
    const navigation = useNavigation()
    const [categoryFilter, setCategoryFilter] = useState([])
    const [selectedCategoryFilter, setSelectedCategoryFilter] = useState([])
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    const [{data, loading, error}, refetch] = useAxios(
        'http://lemka.fun/index.php/wp-json/v1/getCategories/',
        {
            manual: true,
        })

    useEffect(() => {
        forceUpdate()
    }, [selectedCategoryFilter])

    useEffect(() => {
        refetch().then(e => {
            const newArr: ((prevState: never[]) => never[]) | { id: any; title: any; }[] = []
            map(e.data, (e: string, index: number) => {
                newArr.push({id: index, title: e.cat_name, slug: e.slug})
            })
            setCategoryFilter(newArr)
        })
    }, [])


    function removeItemOnce(value: string) {
        // @ts-ignore
        const index = selectedCategoryFilter.indexOf(value);
        const newArr = selectedCategoryFilter
        if (index > -1) {
            newArr.splice(index, 1);
        } else {
            newArr.push(value)
            setSelectedCategoryFilter(newArr)
        }
        forceUpdate()

    }

    const openRandom = () => {
        navigation.navigate('Category', selectedCategoryFilter)
    }

    const renderItem = ({item: {id, title, slug}}: {
        id: number
        title: string
    }) => {
        const isContain = selectedCategoryFilter.indexOf(slug) > -1;
        return (
            <TouchableOpacity
                style={[{
                    backgroundColor: 'rgba(255,255,255,0.83)',
                    padding: 16,
                    width: '49%',
                    borderRadius: 30
                }, isContain && {backgroundColor: 'rgba(255,255,255,0.63)',}]}
                onPress={() => removeItemOnce(slug)}
                key={id}
            >
                <Text style={[styles.catalogTitle, isContain && {color: '#f1a01f'}]}>
                    {isContain}{title}
                </Text>
            </TouchableOpacity>
        )
    }

    return (
        <ImageBackground style={{width: '100%', height: '100%'}}
                         source={require('../../assets/images/catalogBg.png')}>
            <FlatList
                contentContainerStyle={styles.catalogContainer}
                columnWrapperStyle={styles.columnWrapper}
                data={categoryFilter}
                numColumns={2}
                renderItem={renderItem}
            />

            <View style={{paddingBottom: 40,}}>
                <LinearGradient
                    style={{marginHorizontal: 16, marginBottom: 8, borderRadius: 8}}
                    colors={['#96C2BB', '#6BB3A7']}
                    start={{x: 0, y: 1}}
                    end={{x: 1, y: 0}}
                >
                    <TouchableOpacity onPress={openRandom} style={styles.btnContainer}>
                        <Text style={styles.btnText}>Подобрать</Text>
                    </TouchableOpacity>
                </LinearGradient>
                {/*<LinearGradient*/}
                {/*    style={{marginHorizontal: 16, marginBottom: 8, borderRadius: 8}}*/}
                {/*    colors={['#FFBF19', '#FF9901']}*/}
                {/*    start={{x: 0, y: 1}}*/}
                {/*    end={{x: 1, y: 0}}*/}
                {/*>*/}
                {/*    <TouchableOpacity*/}
                {/*        onPress={openRandom}*/}
                {/*        style={styles.btnContainerSmall}*/}
                {/*    >*/}
                {/*        <Text style={styles.btnText}>Мне повезет</Text>*/}
                {/*    </TouchableOpacity>*/}
                {/*</LinearGradient>*/}
            </View>
        </ImageBackground>
    )
}

export default CatalogContainer
