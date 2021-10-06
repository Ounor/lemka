import {StatusBar} from 'expo-status-bar';
import * as React from 'react';
import {ImageBackground, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, TouchableWithoutFeedback} from 'react-native';
import SetFilter from '../store/Filters/SetFilter'
import {Text, View} from '../components/Themed';
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import {BorderRadiuses, Button, Colors, Picker, SegmentedControl, KeyboardAwareScrollView} from 'react-native-ui-lib';

import {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {Formik} from 'formik'
import {useNavigation} from "@react-navigation/native";
import useAxios from "axios-hooks";
import map from "lodash/map";
import xorBy from "lodash/xorBy";
import SelectBox from 'react-native-multi-selectbox'

export default function ModalScreen() {


    const dispatch = useDispatch()
    const setFilter = (filter) => {
        const filterTags = []
        map(filter.tags, (tag) => {
            // console.log(tag)
            filterTags.push(tag.id)
        } )
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
                    navigation.goBack()
                }}
                onReset={() => {
                    setFilter({})
                    navigation.goBack()
                }}
            >
                {({setFieldValue, handleSubmit, resetForm, values}) => (
                    <>
                        <KeyboardAwareScrollView
                            showsVerticalScrollIndicator={false}
                            keyboardDismissMode="interactive"
                            keyboardShouldPersistTaps="always"
                            nestedScrollEnabled = {true}
                        >
                            <MultiSlider
                                values={[3, 9]}
                                containerStyle={{marginTop: 6}}
                                enableLabel
                                customLabel={props => {
                                    return (
                                        <Text style={{marginTop: 12}}>
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
                            <Text>Место игры ?</Text>
                            <SegmentedControl
                                onChangeIndex={e =>
                                    setFieldValue('location', filtersData.location[e].label)
                                }
                                initialIndex={2}
                                containerStyle={{marginVertical: 16}}
                                activeColor={Colors.grey10}
                                borderRadius={BorderRadiuses.br20}
                                inactiveColor={Colors.grey40}
                                segments={filtersData.location}
                            />
                            <Text>Какое время года ?</Text>
                            <SegmentedControl
                                initialIndex={2}
                                onChangeIndex={e =>
                                    setFieldValue('timeOfYear', filtersData.timeOfYear[e].label)
                                }
                                containerStyle={{marginVertical: 16}}
                                activeColor={Colors.grey10}
                                borderRadius={BorderRadiuses.br20}
                                inactiveColor={Colors.grey40}
                                segments={filtersData.timeOfYear}
                            />
                            <MultiSlider
                                values={[3]}
                                containerStyle={{marginTop: 6}}
                                enableLabel
                                customLabel={props => {
                                    return (
                                        <Text>
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
                                values={[3]}
                                containerStyle={{marginTop: 6}}
                                enableLabel
                                customLabel={props => {
                                    return (
                                        <Text>
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
                                label="Предметы и аксессуары"
                                labelStyle={{color: 'black', fontSize: 16}}
                                listEmptyText={'Ничего не найдено'}
                                inputPlaceholder={'Введите название предмета'}
                                multiListEmptyLabelStyle={{fontSize: 16}}
                                options={itemsData}
                                selectedValues={values.tags}
                                onMultiSelect={(item) => {
                                    setFieldValue('tags', xorBy(values.tags, [item], 'id'))
                                } }
                                onTapClose={(item) => {
                                    setFieldValue('tags', xorBy(values.tags, [item], 'id'))
                                } }
                                isMulti
                            />
                            </TouchableWithoutFeedback>
                            <Button onPress={handleSubmit} marginV-10 label="Подобрать"/>
                            <Button onPress={resetForm} marginV-10 label="Сбросить фильтр"/>
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
