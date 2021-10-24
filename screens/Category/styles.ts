import { StyleSheet } from 'react-native'
import { ThemeLayout, ThemeVariables } from '@/Theme/theme.type'

const styles = StyleSheet.create({
  row: {
    padding: 16,
  },
  catalogTitle: {
    fontSize: 16,
  },
  catalogContainer: {
    width: '100%',
    marginTop: 90,
    paddingVertical: 16,
  },
  catalogItemContainer: {
    backgroundColor: 'white',
    borderColor: '#E8E6EA',
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
  },
  btnContainer: {
    padding: 16,
  },
  btnContainerSmall: { padding: 8 },
  btnText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
})

export default styles
