import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper'
import SetFilter from './SetFilter'

export default buildSlice('favoritesList', [SetFilter], {
  filter: {},
}).reducer

export interface IFilterItem {
  timeOfYear: string
  isNeedItems: string
  isActive: string
  location: string
}
