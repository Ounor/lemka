import React, { useEffect } from 'react'
import { ActivityIndicator, View, Text } from 'react-native'
import { useDispatch } from 'react-redux'
import InitStartup from '../../store/Startup/Init'
import { useTranslation } from 'react-i18next'

const IndexStartupContainer = () => {
  const { Layout, Gutters } = useTheme()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(InitStartup.action())
  }, [dispatch])

  return (
    <View style={[Layout.fill, Layout.colCenter]}>
      <ActivityIndicator size={'large'} style={[Gutters.largeVMargin]} />
    </View>
  )
}

export default IndexStartupContainer
