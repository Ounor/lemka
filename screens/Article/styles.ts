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
    marginHorizontal: 16,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.87)',
    marginBottom: 16,
    padding: 16,
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
