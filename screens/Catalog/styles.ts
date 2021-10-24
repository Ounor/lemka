import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  row: {
    padding: 16,
  },
  catalogTitle: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center'
  },
  columnWrapper: {
    // justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  catalogContainer: {

    // backgroundColor: '#f1f1f1',
    marginHorizontal: 16,
    paddingVertical: 16,
  },
  catalogItemContainer: {
    width: '48%',
    backgroundColor: 'white',
    borderColor: '#E8E6EA',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 4,
  },
  btnContainer: {
    backgroundColor: '#005A3C',
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
