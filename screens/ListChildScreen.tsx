import {StatusBar} from 'expo-status-bar';
import * as React from 'react';
import {
    FlatList,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback
} from 'react-native';
import {removeChild} from '../store/Children/AddChild'
import {Text, View} from '../components/Themed';
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import {
    BorderRadiuses,
    Button,
    Colors,
    Picker,
    SegmentedControl,
    KeyboardAwareScrollView,
    TextField,
    DateTimePicker,
    ListItem
} from 'react-native-ui-lib';

import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Formik} from 'formik'
import {useNavigation} from "@react-navigation/native";
import map from "lodash/map";
import {IFavoritesList} from "../store/FavoritesList";

export default function ListChildScreen() {

    const childList = useSelector(
        (state: { childrenList }) =>
            state?.childrenList?.list || [],
    )

    const navigation = useNavigation()
    const dispatch = useDispatch()

    const setFilter = (filter) => {
        dispatch(removeChild(filter))
    }

    const renderRow = (item, index) => <ListItem
        // @ts-expect-error
        style={{flex: 1, flexDirection: 'row'}}
        activeOpacity={0.3}
        height={77.5}
        onPress={() => setFilter(item)}
    >
        <Text grey10 text70 style={{margin: 10}} numberOfLines={1}>
            {item.name} {item.birthDay}
        </Text>
    </ListItem>
    return (
        <ImageBackground style={styles.container}
                         source={require('../assets/images/filterBg.png')}>
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'}/>
                <FlatList
                    style={{backgroundColor: 'rgba(194,194,194,0)'}}
                    data={childList}
                    contentContainerStyle={{backgroundColor: 'transparent'}}
                    renderItem={({item, index}) => renderRow(item, index)}
                    // keyExtractor={this.keyExtractor}
                />
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
