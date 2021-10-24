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
import {
    Button,
    ListItem
} from 'react-native-ui-lib';

import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";

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

    const renderRow = (item, index) => <View
        style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'transparent'}}
    >

        <Text grey10 text70 style={{marginVertical: 30, fontSize: 16}} numberOfLines={1}>
           Имя - {item.name}:  {item.age} лет
        </Text>
        <Button backgroundColor={'#005A3C'} onPress={() => setFilter(item)} marginV-15 label="Удалить"/>

    </View>
    return (
        <ImageBackground style={styles.container}
                         source={require('../assets/images/filterBg.png')}>
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'}/>
                <FlatList
                    style={{backgroundColor: 'rgba(194,194,194,0)', marginTop: 60, marginHorizontal: 16}}
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
