import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper'
import AddToWish from './AddOrRemoveWish'

export default buildSlice('favoritesList', [AddToWish], {
  list: [],
}).reducer

export interface IFavoritesList {
  list: IFavoriteItem[]
}
export interface IFavoriteItem {
  id: number
  content: string
  title: string,
  imageUri: string
}
