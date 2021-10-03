import React, { memo } from 'react'
import { StyleSheet } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'

type Props = React.ComponentProps<typeof PaperButton>

const Button = ({ mode, style, children, ...props }: Props) => (
  <PaperButton
    uppercase={false}
    style={[
      styles.button,
      mode === 'outlined' && { backgroundColor: '#4969AE' },
      style,
    ]}
    labelStyle={styles.text}
    mode={mode}
    {...props}
  >
    {children}
  </PaperButton>
)

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 40,
    marginBottom: 25,
    borderRadius: 30,
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
    lineHeight: 30,
  },
})

export default memo(Button)
