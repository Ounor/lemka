import React, { useEffect, useState } from 'react'
import { FlatList, ImageBackground, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import styles from '../Category/styles'
import { useDispatch, useSelector } from 'react-redux'
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
import { white } from 'react-native-paper/lib/typescript/styles/colors'
import {IFavoriteItem, IFavoritesList } from '../../store/FavoritesList'
import useAxios from "axios-hooks";

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
            url: 'http://lemka.fun/index.php/wp-json/v1/getPosts/',
            method: "POST",
            data: {
                category: route.params
            }
        },
        {
            manual: true,
        })

    // console.log(data.data?.length)

    useEffect(() => {
        refetch().then(e => {
            const newArr: ((prevState: never[]) => never[]) | { id: any; title: any; }[] = []

            // console.log(e.data.data)
            map(e.data, (item) => newArr.push(item))
            setCatalogData(newArr)
        })
    }, [])
  // useEffect(async () => {
  //   let data = await fetch(
  //     'https://sheets.googleapis.com/v4/spreadsheets/1HPfftIKLKDFJyNMwbW2RitY-RzQJ3YdPiwlywcl9dr8/values/Games/?alt=json&key=AIzaSyDYvtqeOGkywftg8VQr5_UiD-_Zcl6rF64',
  //   )
  //   let { values } = await data.json()
  //   const keys = values[0]
  //   const newData = []
  //   values.shift()
  //   values.map(data => {
  //     // console.log(data)
  //     if (data.length > 3) {
  //       const game = {
  //         [keys[0]]: parseInt(data[0].replace(/\s+/g, '')),
  //         [keys[1]]: data[1].trim() || '',
  //         [keys[2]]: data[2].trim() || '',
  //         [keys[3]]: data[3].trim() || '',
  //         [keys[4]]: data[4].trim() || '',
  //         [keys[5]]: data[5].trim().split(',') || '', // age
  //         [keys[6]]: data[6].trim().split(',') || '', // childCount
  //         [keys[7]]: data[7].trim() || '', //
  //         [keys[10]]: data[10].trim() || '',
  //         [keys[11]]: data[10].trim() || '',
  //         [keys[12]]: data[10].trim() || '',
  //         [keys[13]]: data[10].trim() || '',
  //         [keys[13]]: data[10].trim() || '',
  //         [keys[15]]: data[10].trim() || '',
  //       }
  //       newData.push(game)
  //     }
  //     setCatalogData(newData)
  //   })
  // }, [])

  function contains(target, pattern){
    var value = 0;
    pattern.forEach(function(word){
      value = value + target.includes(word);
    });
    return (value === 1)
  }

  useEffect(() => {
    const newFilters = {}
    const age = {}
    assign(newFilters, filters)
    if (filters.age) {
      assign(age, [filters.age])
    }
    delete newFilters?.age

    // console.log(age[0])

    let filtered = filter(catalogData, newFilters)
    if (age[0]) {
      filtered = filter(filtered, (item) => contains(item.age, [age[0][0].toString(), age[0][1].toString()]))
      setFilteredCatalogData(filtered);
    } else {
      setFilteredCatalogData(filtered)
    }
  }, [filters])

  const _renderItem = ({ item }: any) => {
    const { ID, post_title, post_content }: IFavoriteItem = item
      console.log(item)
    const isInWish = find(favoritesList, ['id', ID])
    const addToWish = () => dispatch(AddToWish.action({ id: ID, post_content, post_title }))
    const handleNavigate = () => {
      navigation.navigate('Article', { post_title, post_content })
    }
    return (
      <CardLil
          key={ID}
        isInWish={isInWish}
        handleNavigate={handleNavigate}
        addToWish={addToWish}
        id={ID}
        content={post_content}
        title={post_title}
      />
    )
  }

  return (
      <ImageBackground style={{width: '100%', height: '100%'}}
                       source={require('../../assets/images/searchBg.png')}>

      <Text style={{ margin: 16, textAlign: 'center', fontSize: 16 }}>
        Игр по вашему запросу найдено - {catalogData.length}
      </Text>
      <FlatList
        ListEmptyComponent={() => (
          <View style={{ margin: 16 }}>
            <Text style={{ textAlign: 'center', fontSize: 16 }}>
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
                style={{ color: 'white', textAlign: 'center', fontSize: 16 }}
              >
                Сбросить фильтр
              </Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id}
        style={styles.catalogContainer}
        data={catalogData}
        renderItem={_renderItem}
      />
    </ImageBackground>
  )
}

export default CategoryContainer
