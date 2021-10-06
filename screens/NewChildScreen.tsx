import {StatusBar} from 'expo-status-bar';
import * as React from 'react';
import {ImageBackground, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, TouchableWithoutFeedback} from 'react-native';
import { addChild } from '../store/Children/AddChild'
import {Text, View} from '../components/Themed';
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import {BorderRadiuses, Button, Colors, Picker, SegmentedControl, KeyboardAwareScrollView, TextField, DateTimePicker} from 'react-native-ui-lib';

import {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {Formik} from 'formik'
import {useNavigation} from "@react-navigation/native";
import map from "lodash/map";

export default function NewChildScreen() {

    const dispatch = useDispatch()
    const navigation = useNavigation()

    const setFilter = (filter) => {
         dispatch(addChild(filter))
        navigation.goBack()
    }

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
                    age: 6,
                    birthDay: '2015-06-25T18:30:00.000Z',
                }}
                onSubmit={values => {
                    setFilter(values)
                    // navigation.goBack()
                    // console.log(values)
                }}


            >
                {({setFieldValue, handleSubmit, resetForm, values}) => (
                    <>
                        <View style={{backgroundColor: 'transparent', paddingTop: 32}}>

                            <TextField
                                containerStyle={{ borderRadius: 30, backgroundColor: 'rgba(255,255,255,0.76)', paddingTop: 22, paddingHorizontal: 12}}
                                key={'not-centered'}
                                value={values.name}
                                onChangeText={value => {
                                    setFieldValue('name', value)
                                }}
                                placeholder={'Елисей'}
                                hideUnderline={true}
                                title={'Имя ребенка'}
                            />

                            <DateTimePicker
                                hideUnderline={true}

                                locale={'ru'}
                                onChange={value => {
                                    console.log(value)
                                    setFieldValue('birthDay', value.toString())
                                }}
                                containerStyle={{ marginTop: 32, borderRadius: 30, backgroundColor: 'rgba(255,255,255,0.76)', paddingTop: 22, paddingHorizontal: 12}}
                                title={'Дата рождения'}
                                placeholder={'Выберите дату рождения'}
                                dateFormat={'D.MM.YYYY'}
                                value={new Date(values.birthDay)}
                            />

                    </View>
                            <Button onPress={handleSubmit} marginV-10 label="Добавить"/>
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
