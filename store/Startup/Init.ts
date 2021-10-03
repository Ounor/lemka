import {
  buildAsyncState,
  buildAsyncActions,
  buildAsyncReducers,
} from '@thecodingmachine/redux-toolkit-wrapper'

export default {
  initialState: buildAsyncState(),
  action: buildAsyncActions('startup/init', async (args, { dispatch }) => {
    // Timeout to fake waiting some process
    // Remove it, or keep it if you want display a beautiful splash screen ;)
    await new Promise(resolve => setTimeout(resolve, 1000))
    // Here we load the user 1 for example, but you can for example load the connected user
    // await dispatch(FetchOne.action('1'))
    // Navigate and reset to the main navigator
    // navigateAndSimpleReset('Main')
  }),
  reducers(root) {
    console.log('redus', root)
  },
}
