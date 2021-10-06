import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import find from 'lodash/find'
import filter from 'lodash/filter'
import remove from 'lodash/remove'
interface iChild {
  name: string,
  birthDay: string
}
export interface CounterState {
  list: iChild[]
}

const initialState: CounterState = {
  list: [],
}

export const childrenSlice = createSlice({
  name: 'childrenList',
  initialState,
  reducers: {
    addChild: (state, action) => {
      // const isIsset = find(state.list, 'birthDay', action.payload.birthDay)
      // if (!isIsset) {
      //   state.list = [...state.list, action.payload]
      // } else {
      //   state.list = [...state.list]
      // }
      state.list = [...state.list, action.payload]

    },
    removeChild: (state, action) => {
      const newState = remove(state.list, ['birthDay', action.payload.birthDay])
      console.log(state.list.length, newState.length)
      state.list
    },

  },
})

export const { addChild, removeChild } = childrenSlice.actions

export default childrenSlice.reducer
