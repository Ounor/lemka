import React, { memo } from 'react'
import { StyleSheet, Text } from 'react-native'
import { theme } from '../core/theme'

type Props = {
  children: React.ReactNode
}

const Header = ({ children }: Props) => (
  <Text style={styles.header}>{children}</Text>
)

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    fontSize: 26,
    color: theme.colors.white,
    fontWeight: 'bold',
    paddingVertical: 14,
  },
})

export default memo(Header)
