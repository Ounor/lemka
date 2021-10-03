import React, { useEffect, useRef, useState } from 'react'
import { View, Image, ScrollView } from 'react-native'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import { Modal, Text } from 'react-native-paper'
import {
  BorderRadiuses,
  Button,
  Colors,
  Picker,
  SegmentedControl,
} from 'react-native-ui-lib'
import { Formik } from 'formik'
import AddToWish from '../store/FavoritesList/AddOrRemoveWish'
import { useDispatch } from 'react-redux'
import SetFilter from '@/store/Filters/SetFilter'

interface Props {
  visible: boolean
  setVisible: () => void
}

const Filter = ({ visible, setVisible, mode }: Props) => {
  const [scrollIsEnable, setEnableScroll] = React.useState(true)
  const [childCount, setChildCount] = React.useState({ label: '1', value: '1' })
  const [parentsCount, setParentsCount] = React.useState(true)
  const refOne = useRef()
  const refTwo = useRef()
  const refThree = useRef()

  const enableScroll = () => setEnableScroll(true)
  const disableScroll = () => setEnableScroll(false)
  const hideModal = () => setVisible(false)
  const containerStyle = { backgroundColor: 'white', padding: 20, margin: 30 }
  const dispatch = useDispatch()
  const setFilter = filter => dispatch(SetFilter.action(filter))

  const [filterReady, setFilterReady] = useState(false)
  const [filtersData, setFiltersData] = useState({
    timeOfYear: [{ label: 'лето' }, { label: 'зима' }, { label: 'неважно' }],
    isNeedItems: [{ label: 'нет' }, { label: 'да' }, { label: 'неважно' }],
    // isActive: [
    //   { label: 'активная' },
    //   { label: 'спокойная' },
    //   { label: 'неважно' },
    // ],
    location: [
      { label: 'на улице' },
      { label: 'в помещении' },
      { label: 'неважно' },
    ],
  })

  useEffect(async () => {
    try {
      let data = await fetch(
        'https://sheets.googleapis.com/v4/spreadsheets/1HPfftIKLKDFJyNMwbW2RitY-RzQJ3YdPiwlywcl9dr8/values/Filters/?alt=json&key=AIzaSyDYvtqeOGkywftg8VQr5_UiD-_Zcl6rF64',
      )
      let { values } = await data.json()
      values.map((value: string[]) => {
        const key: string = [value[0]].toString()
        value.shift()
        const jsonStr = value
          .toString()
          .replace(/(\w+:)|(\w+ :)/g, function (s) {
            return '"' + s.substring(0, s.length - 1) + '":'
          })
        // console.log(jsonStr)

        filtersData[key] = JSON.parse(jsonStr)
      })
      setFilterReady(false)
      setFiltersData(filtersData)
    } catch {
      console.log('Error')
    }
  }, [])

  return (
    <Modal
      visible={visible}
      onDismiss={hideModal}
      contentContainerStyle={containerStyle}
    >
      <Formik
        initialValues={{
          isNeedItems: 'нет',
          location: 'неважно',
          timeOfYear: 'неважно',
        }}
        onReset={() => {
          setFilter({})
          hideModal()
        }}
        onSubmit={values => {
          hideModal()
          setFilter(values)
        }}
      >
        {({ setFieldValue, handleSubmit, resetForm }) => (
          <>
            <ScrollView scrollEnabled={scrollIsEnable}>
              <MultiSlider
                values={[3, 6]}
                sliderLength={240}
                containerStyle={{ margin: 16 }}
                enableLabel
                customLabel={props => {
                  return (
                    <Text>
                      Возраст: от {props.oneMarkerValue} до{' '}
                      {props.twoMarkerValue} лет{' '}
                    </Text>
                  )
                }}
                onValuesChangeFinish={value => {
                  // console.log(value)
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
                ref={refOne}
                onChangeIndex={e =>
                  setFieldValue('location', filtersData.location[e].label)
                }
                initialIndex={2}
                containerStyle={{ marginVertical: 16 }}
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
                containerStyle={{ marginVertical: 16 }}
                activeColor={Colors.grey10}
                borderRadius={BorderRadiuses.br20}
                inactiveColor={Colors.grey40}
                segments={filtersData.timeOfYear}
              />
              {/*<Picker*/}
              {/*  title="Количество детей"*/}
              {/*  placeholder="1-3"*/}
              {/*  useNativePicker*/}
              {/*  value={childCount}*/}
              {/*  topBarProps={{ doneLabel: 'Выбрать', cancelLabel: 'Отмена' }}*/}
              {/*  onChange={(nativePickerValue: { label: string; value: string }) =>*/}
              {/*    setChildCount(nativePickerValue)*/}
              {/*  }*/}
              {/*  // rightIconSource={dropdown}*/}
              {/*  containerStyle={{ marginTop: 20 }}*/}
              {/*>*/}
              {/*  {_.map(options, option => (*/}
              {/*    <Picker.Item*/}
              {/*      key={option.value}*/}
              {/*      value={option.value}*/}
              {/*      label={option.label}*/}
              {/*      disabled={option.disabled}*/}
              {/*    />*/}
              {/*  ))}*/}
              {/*</Picker>*/}

              {/*<Picker*/}
              {/*  title="Сколько взрослых на подмоге ?"*/}
              {/*  placeholder="1"*/}
              {/*  useNativePicker*/}
              {/*  value={childCount}*/}
              {/*  topBarProps={{ doneLabel: 'Выбрать', cancelLabel: 'Отмена' }}*/}
              {/*  onChange={(nativePickerValue: { label: string; value: string }) =>*/}
              {/*    setChildCount(nativePickerValue)*/}
              {/*  }*/}
              {/*>*/}
              {/*  {_.map(filtersData.parentsCount, option => (*/}
              {/*    <Picker.Item*/}
              {/*      key={option.value}*/}
              {/*      value={option.value}*/}
              {/*      label={option.label}*/}
              {/*      disabled={option.disabled}*/}
              {/*    />*/}
              {/*  ))}*/}
              {/*</Picker>*/}
              <Text>Нужны ли предметы/аксессуары ?</Text>
              <SegmentedControl
                ref={refTwo}
                onChangeIndex={e =>
                  setFieldValue('isNeedItems', filtersData.isNeedItems[e].label)
                }
                containerStyle={{ marginVertical: 16 }}
                activeColor={Colors.grey10}
                borderRadius={BorderRadiuses.br20}
                inactiveColor={Colors.grey40}
                segments={filtersData.isNeedItems}
              />
              {/*<Text>Тип задания</Text>*/}
              {/*<SegmentedControl*/}
              {/*  onChangeIndex={e =>*/}
              {/*    setFieldValue('isActive', filtersData.isActive[e].label)*/}
              {/*  }*/}
              {/*  initialIndex={2}*/}
              {/*  containerStyle={{ marginTop: 16 }}*/}
              {/*  activeColor={Colors.grey10}*/}
              {/*  borderRadius={BorderRadiuses.br20}*/}
              {/*  inactiveColor={Colors.grey40}*/}
              {/*  segments={filtersData.isActive}*/}
              {/*/>*/}
            </ScrollView>
            <Button onPress={handleSubmit} marginV-20 label="Подобрать" />
            <Button onPress={resetForm} marginV-20 label="Сбросить фильтр" />
          </>
        )}
      </Formik>
    </Modal>
  )
}

export default Filter
