import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper'
import AddChild from './AddChild'

export default buildSlice('childrenList', [AddChild], {
  children: {},
}).reducer
