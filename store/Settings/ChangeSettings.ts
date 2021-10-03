import { createAction } from '@reduxjs/toolkit'
import { SettingsState } from '@/store/Settings/index'

interface PayloadInterface {
  payload: Partial<SettingsState>
}

export default {
  initialState: {},
  action: createAction<Partial<SettingsState>>('settings/changeTheme'),
  reducers(state: SettingsState, { payload }: PayloadInterface) {
    if (typeof payload.darkMode !== 'undefined') {
      state.darkMode = payload.darkMode
    }
  },
}
