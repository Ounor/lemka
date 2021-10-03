import React, { memo } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput as Input } from 'react-native-paper'
import { theme } from '../core/theme'

// eslint-disable-next-line react/require-default-props
type Props = React.ComponentProps<typeof Input> & { errorText?: string }

const TextInput = ({ errorText, ...props }: Props) => (
  <View style={styles.container}>
    <Input
      outlineColor={theme.colors.green}
      style={styles.input}
      selectionColor={theme.colors.green}
      underlineColor="transparent"
      theme={{
        roundness: 12,
        colors: {
          primary: theme.colors.green,
          accent: '#f1c40f',
        },
      }}
      // mode="outlined"
      {...props}
    />
    {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
  </View>
)

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  input: {
    backgroundColor: theme.colors.white,
  },
  error: {
    fontSize: 14,
    color: theme.colors.error,
    paddingHorizontal: 4,
    paddingTop: 4,
  },
})

export default memo(TextInput)
