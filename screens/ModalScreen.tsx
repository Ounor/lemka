import {StatusBar} from 'expo-status-bar';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {ImageBackground, Platform, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import SetFilter from '../store/Filters/SetFilter'
import {Text, View} from '../components/Themed';
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import {BorderRadiuses, Button, KeyboardAwareScrollView, SegmentedControl} from 'react-native-ui-lib';
import {useDispatch, useSelector} from "react-redux";
import {Formik} from 'formik'
import {useNavigation} from "@react-navigation/native";
import useAxios from "axios-hooks";
import map from "lodash/map";
import xorBy from "lodash/xorBy";
import sortBy from "lodash/sortBy";
import SelectBox from 'react-native-multi-selectbox'

export default function ModalScreen() {

    const filters = useSelector(
        (state: { filter: { filter } }) => state?.filter?.filter || [],
    )

    const childList = useSelector(
        (state: { childrenList }) =>
            state?.childrenList?.list || [],
    )

    const dispatch = useDispatch()
    const setFilter = (filter) => {
        const filterTags = []
        map(filter.tags, (tag) => {
            // console.log(tag)
            filterTags.push(tag.id)
        })
        filter.tags = filterTags
        dispatch(SetFilter.action(filter))
    }
    const navigation = useNavigation()
    const [itemsData, setItemsData] = useState([])
    const [{data, loading, error}, refetch] = useAxios(
        {
            url: 'https://lemka.fun/index.php/wp-json/v1/getItems/',
            method: "GET",
        },
        {
            manual: true,
        })


    useEffect(() => {
        refetch().then(e => {
            const newArr: ((prevState: never[]) => never[]) | { id: any; item: any; }[] = []
            map(e.data, (item) => {
                newArr.push({
                    id: item.slug,
                    item: item.name
                })
            })
            setItemsData(newArr)
        })
    }, [])

    const [filtersData, setFiltersData] = useState({
        timeOfYear: [{label: 'лето'}, {label: 'зима'}, {label: 'неважно'}],
        isNeedItems: [{label: 'нет'}, {label: 'да'}, {label: 'неважно'}],
        isActive: [
            {label: 'активная'},
            {label: 'спокойная'},
            {label: 'неважно'},
        ],
        location: [
            {label: 'на улице'},
            {label: 'в помещении'},
            {label: 'неважно'},
        ],
    })

    let childArrAge = [1, 10]


    if (childList.length > 1) {
        sortBy(childList, ['name', 'age'])
        childArrAge = [childList[0].age, childList[childList.length - 1].age]
    }

    const childAgeDef =
        (childList.length === 1)
            ? [childList[0].age - 1, childList[0].age + 1]
            : childArrAge

    return (
        <ImageBackground style={styles.container}
                         source={require('../assets/images/filterBg.png')}>
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'}/>
            <View style={{
                flex: 1,
                justifyContent: 'space-between',
                backgroundColor: 'rgba(194,194,194,0)',
                paddingHorizontal: 16,
                paddingBottom: 22,
                marginTop: 50,
            }}>
                <Formik
                    initialValues={{
                        isNeedItems: 'нет',
                        location: 'неважно',
                        timeOfYear: 'неважно',
                        tags: []
                    }}
                    onSubmit={values => {
                        setFilter(values)
                        // navigation.goBack()
                        navigation.navigate({
                            name: 'Catalog',
                            params: {id: [], title: 'Результаты', apply: true},
                        });
                        // navigation.navigate('Category', {id :[], title: 'Результаты'})
                    }}
                    onReset={() => {
                        setFilter({})
                        navigation.goBack()
                        // navigation.navigate('Category')
                    }}
                >
                    {({setFieldValue, handleSubmit, resetForm, values}) => (
                        <>
                            <KeyboardAwareScrollView
                                showsVerticalScrollIndicator={false}
                                keyboardDismissMode="interactive"
                                keyboardShouldPersistTaps="always"
                                nestedScrollEnabled={true}
                            >
                                <MultiSlider
                                    markerStyle={{backgroundColor: '#005A3C'}}
                                    trackStyle={{backgroundColor: 'white', borderColor: '#005A3C'}}
                                    selectedStyle={{backgroundColor: '#005A3C'}}
                                    values={childAgeDef}
                                    containerStyle={{marginTop: 6}}
                                    enableLabel
                                    customLabel={props => {
                                        return (
                                            <Text style={{marginTop: 14, color: 'white'}}>
                                                Возраст: от {props.oneMarkerValue} до{' '}
                                                {props.twoMarkerValue} лет{' '}
                                            </Text>
                                        )
                                    }}
                                    onValuesChangeFinish={value => {
                                        setFieldValue('age', value)
                                    }}
                                    min={0}
                                    max={18}
                                    step={1}
                                    allowOverlap={false}
                                    snapped
                                    minMarkerOverlapDistance={40}
                                />
                                <Text style={{marginTop: 14, color: 'white'}}>
                                    Место игры ?</Text>
                                <SegmentedControl
                                    onChangeIndex={e =>
                                        setFieldValue('location', filtersData.location[e].label)
                                    }
                                    activeBackgroundColor={'#005A3C'}
                                    initialIndex={2}
                                    outlineWidth={0}
                                    containerStyle={{marginVertical: 16}}
                                    activeColor={'#FFF'}
                                    inactiveColor={'rgb(241,241,241)'}
                                    backgroundColor={'rgba(0,90,60,0.45)'}
                                    borderRadius={BorderRadiuses.br30}
                                    style={{borderColor: 'transparent', borderRadius: 30}}
                                    segments={filtersData.location}
                                />
                                <Text style={{marginTop: 14, color: 'white'}}>
                                    Какое время года ?</Text>
                                <SegmentedControl
                                    initialIndex={2}
                                    onChangeIndex={e =>
                                        setFieldValue('timeOfYear', filtersData.timeOfYear[e].label)
                                    }
                                    activeBackgroundColor={'#005A3C'}
                                    outlineWidth={0}
                                    containerStyle={{marginVertical: 16}}
                                    activeColor={'#FFF'}
                                    inactiveColor={'rgb(241,241,241)'}
                                    backgroundColor={'rgba(0,90,60,0.45)'}
                                    borderRadius={BorderRadiuses.br30}
                                    style={{borderColor: 'transparent', borderRadius: 30}}
                                    segments={filtersData.timeOfYear}
                                />
                                <MultiSlider
                                    values={[3]}
                                    containerStyle={{marginTop: 6}}
                                    markerStyle={{backgroundColor: '#005A3C'}}
                                    trackStyle={{backgroundColor: 'white', borderColor: '#005A3C'}}
                                    selectedStyle={{backgroundColor: '#005A3C'}}
                                    enableLabel
                                    customLabel={props => {
                                        return (
                                            <Text style={{marginTop: 14, color: 'white'}}>
                                                Кол-во взрослых - {props.oneMarkerValue} чел.
                                            </Text>
                                        )
                                    }}
                                    onValuesChangeFinish={value => {
                                        setFieldValue('parentsCount', value)
                                    }}
                                    min={0}
                                    max={10}
                                    step={1}
                                    allowOverlap={false}
                                    snapped
                                    minMarkerOverlapDistance={40}
                                />
                                <MultiSlider
                                    values={[childList.length ? childList.length : 2]}
                                    markerStyle={{backgroundColor: '#005A3C'}}
                                    trackStyle={{backgroundColor: 'white', borderColor: '#005A3C'}}
                                    selectedStyle={{backgroundColor: '#005A3C'}}
                                    containerStyle={{marginTop: 6}}
                                    enableLabel
                                    customLabel={props => {
                                        return (
                                            <Text style={{marginTop: 14, color: 'white'}}>
                                                Количество детей - до {props.oneMarkerValue} чел.
                                            </Text>
                                        )
                                    }}
                                    onValuesChangeFinish={value => {
                                        setFieldValue('childCount', value)
                                    }}
                                    min={0}
                                    max={6}
                                    step={1}
                                    allowOverlap={false}
                                    snapped
                                    minMarkerOverlapDistance={40}
                                />
                                <TouchableWithoutFeedback>
                                    <SelectBox
                                        multiSelectInputFieldProps={{
                                            showsVerticalScrollIndicator: false
                                        }}
                                        listOptionProps={
                                            {
                                                showsVerticalScrollIndicator: false,
                                                showsHorizontalScrollIndicator: false,
                                            }
                                        }
                                        multiOptionsLabelStyle={{fontSize: 14}}
                                        arrowIconColor={'#005A3C'}
                                        searchIconColor={'#005A3C'}
                                        toggleIconColor={'#005A3C'}
                                        containerStyle={{marginBottom: '10%'}}
                                        multiOptionContainerStyle={{backgroundColor: '#005A3C'}}
                                        label="Предметы и аксессуары"
                                        labelStyle={{color: 'white', fontSize: 14}}
                                        listEmptyText={'Ничего не найдено'}
                                        inputPlaceholder={'Введите название предмета'}
                                        multiListEmptyLabelStyle={{fontSize: 14}}
                                        options={itemsData}
                                        selectedValues={values.tags}
                                        onMultiSelect={(item) => {
                                            setFieldValue('tags', xorBy(values.tags, [item], 'id'))
                                        }}
                                        onTapClose={(item) => {
                                            setFieldValue('tags', xorBy(values.tags, [item], 'id'))
                                        }}
                                        isMulti
                                    />
                                </TouchableWithoutFeedback>
                                <Button backgroundColor={'#005A3C'} onPress={handleSubmit} marginV-10
                                        label="Подобрать"/>
                                <Button backgroundColor={'#005A3C'} onPress={resetForm} marginV-10
                                        label="Сбросить фильтр"/>
                            </KeyboardAwareScrollView>
                        </>
                    )}
                </Formik>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%', height: '100%'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
    },
});
