import { configureStore } from '@reduxjs/toolkit'
import varSlice  from './slices/variableGlobal'
import modalSlice  from './slices/modal'
import  guideSlice  from './slices/guide'

// ...

export const store = configureStore({
  reducer: {
   var1: varSlice,
   modal: modalSlice,
   guide:guideSlice 
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch