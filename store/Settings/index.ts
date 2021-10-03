import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper'
import ChangeSettings from '../Settings/ChangeSettings'

export default buildSlice('settings', [ChangeSettings], {
  darkMode: null,
  children: [],
  premiumStatus: false,
  language: 'ru',
}).reducer

interface Child {
  name: string
  age: number
  gender: number
}
export interface SettingsState {
  darkMode: boolean | null
  children: Child[]
  premiumStatus: boolean
  language: string
}
