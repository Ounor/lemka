import { createAction } from '@reduxjs/toolkit'
import { IFilterList } from './index'

interface IFilter {
  filter: { age: {}, isNeedItems: 'нет'; location: 'неважно'; timeOfYear: 'неважно' }
}

interface FilterInterface {
  payload: IFilter
}

export default {
  initialState: {},
  action: createAction<Partial<IFilterList>>('setFilter'),
  reducers(state: IFilterList, { payload }: FilterInterface) {
    state.filter = { ...payload }
  },
}
