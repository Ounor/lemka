import { createAction } from '@reduxjs/toolkit'
import { IFavoriteItem, IFavoritesList } from './index'
import { find, remove } from 'lodash'
interface PayloadInterface {
  payload: IFavoriteItem
}

export default {
  initialState: {},
  action: createAction<Partial<IFavoritesList>>('favoritesList/addToList'),
  reducers(state: IFavoritesList, { payload }: PayloadInterface) {
    const item = {
      id: payload.id,
      content: payload.content,
      title: payload.title,
    }
    const index = find(state.list, ['id', payload.id])
    if (!index) {
      state.list.push(<IFavoriteItem>item)
    } else {
      remove(state.list, ['id', payload.id])
    }
  },
}
