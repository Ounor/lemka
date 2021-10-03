import React, { memo } from 'react'
import { StyleSheet, Text, TextStyle } from 'react-native'
import { theme } from '../core/theme'

type Props = {
  children: React.ReactNode
  style: TextStyle
}

const Paragraph = ({ children, style }: Props) => (
  <Text style={[styles.text, style]}>{children}</Text>
)

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 26,
    color: theme.colors.white,
    textAlign: 'center',
  },
})

export default memo(Paragraph)
