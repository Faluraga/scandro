import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
//import { RootState } from '../store'

// Define a type for the slice state
interface Variable
{
    value: boolean
}

// Define the initial state using that type
const initialState: Variable = {
    value: false,
}

export const varSlice = createSlice({
    name: 'counter',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {

        // Use the PayloadAction type to declare the contents of `action.payload`
        changeStatusVar: (state, action: PayloadAction<boolean>) =>
        {
            state.value = action.payload
        },
    },
})

export const { changeStatusVar} = varSlice.actions

// Other code such as selectors can use the imported `RootState` type
//export const selectCount = (state: RootState) => state.counter.value

export default varSlice.reducer