import {StatusBar} from 'expo-status-bar';
import * as React from 'react';
import {ImageBackground, Platform, StyleSheet} from 'react-native';
import {addChild} from '../store/Children/AddChild'
import {View} from '../components/Themed';
import {Button, DateTimePicker, KeyboardAwareScrollView, TextField} from 'react-native-ui-lib';
import {useDispatch} from "react-redux";
import {Formik} from 'formik'
import {useNavigation} from "@react-navigation/native";
import {useState} from "react";

function calculateAge(birthday) { // birthday is a date
    var ageDifMs = Date.now() - new Date(birthday);
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export default function NewChildScreen() {

    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [isError, setError] = useState(false)
    const setFilter = (filter) => {
        dispatch(addChild(filter))
        navigation.goBack()
    }

    return (
        <ImageBackground style={styles.container}
                         source={require('../assets/images/filterBg.png')}>
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'}/>
            <KeyboardAwareScrollView style={{
                paddingHorizontal: 16,
                paddingBottom: 22,
                marginTop: 60
            }}>
                <Formik
                    initialValues={{
                        name: '',
                        age: 0,
                        birthDay: '2015-06-25T18:30:00.000Z',
                    }}
                    onSubmit={values => {
                        values.age = calculateAge(values.birthDay)

                        if (!values.name) {
                            setError(true)
                        } else {
                            setFilter(values)
                            navigation.goBack()
                        }

                    }}


                >
                    {({setFieldValue, handleSubmit, resetForm, values}) => (
                        <>
                            <View style={{backgroundColor: 'rgba(0,90,60,0.6)', paddingTop: 32, borderRadius: 30}}>
                                <TextField
                                    required
                                    titleColor={'#fff'}
                                    color={'white'}
                                    error={isError ?  'Обязательное поле' : false}
                                    containerStyle={{borderRadius: 30, padding: 12, paddingHorizontal: 16}}
                                    key={'not-centered'}
                                    value={values.name}
                                    onChangeText={value => {
                                        setError(false)
                                        setFieldValue('name', value)
                                    }}
                                    floatOnFocus
                                    placeholderTextColor={'rgba(255,255,255,0.77)'}
                                    placeholder={'Пример: Олег'}
                                    hideUnderline={true}
                                    onPressOut={() => console.log(111)}
                                    title={'Введите имя ребенка'}
                                />

                                <DateTimePicker
                                    hideUnderline={true}
                                    locale={'ru'}
                                    onChange={value => {
                                        console.log(value)
                                        setFieldValue('birthDay', value.toString())
                                    }}
                                    containerStyle={{marginTop: 32, paddingTop: 22, paddingHorizontal: 12}}
                                    title={'Дата рождения'}
                                    placeholderTextColor={'rgba(255,255,255,0.77)'}
                                    titleColor={'#fff'}
                                    color={'#fff'}
                                    placeholder={'Выберите дату рождения'}
                                    dateFormat={'D.MM.YYYY'}
                                    value={new Date(values.birthDay)}
                                />

                            </View>
                            <Button backgroundColor={'#005A3C'} onPress={handleSubmit} marginV-10 label="Добавить"/>
                        </>
                    )}
                </Formik>
            </KeyboardAwareScrollView>
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
